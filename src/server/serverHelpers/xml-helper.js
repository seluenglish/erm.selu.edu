import _ from 'lodash'
import recursive from 'recursive-readdir'
import path from 'path'
import fs from 'fs'
import cheerio from 'cheerio'
import { getKeywordsForText } from 'helpers/keyword-helper'
import { parseDate } from './date-helper'
import moment from 'moment'

const dateStringBeforeLength = 30
const dateStringAfterLength = 30

export const findXmlsInDirs = async (dirPaths) => {
  if (_.isString(dirPaths)) {
    dirPaths = [ dirPaths ]
  }

  const passXmlOnly = (name, stats) => {
    const ext = path.extname(name)

    if (stats.isDirectory()) return false

    return ext !== '.xml'
  }

  let result = await Promise.all(dirPaths.map(async (dirPath) => {
    const resolvedDirPath = path.resolve(dirPath)

    const thisR = await recursive(dirPath, [ passXmlOnly ])

    return thisR
      .map(x => path.resolve(x))
      .map(x => x.substring(resolvedDirPath.length + 1))
  }))
  result = result.reduce((acc, x) => new Set([ ...acc, ...x ]), [])

  return Array.from(result)
}

export function resolveXmlFilePath(file, dirPaths) {
  const foundAtPath = dirPaths.reverse().find((dirPath) => {
    const full = path.join(dirPath, file)
    return fs.existsSync(full)
  })

  return path.resolve(path.join(foundAtPath, file))
}

export function parseXmlFile(xmlFilePath) {
  let fileData = fs.readFileSync(xmlFilePath)
  fileData = fileData.toString('utf-8')

  const $ = cheerio.load(fileData, {
    normalizeWhitespace: true,
    xmlMode: true,
    withDomLvl1: true,
  })

  return $
}

const extractCorresps = ($) => {
  return $('body [corresp]').map((_, elem) => {
    const $elem = $(elem)
    const corresp = $elem.attr('corresp')
    const text = $elem.text()

    const tagData = resolveTagTypes($elem, $)
    if (tagData === undefined) return tagData

    const { tagName, type, subType } = tagData

    return {
      corresp,
      text,
      tagName,
      type,
      subType,
      keywords: getKeywordsForText(text, corresp),
    }
  }).get()
}

const extractDates = ($) => {
  return $('body date').map((_, elem) => {
    const ret = {}
    let beforeStr='', afterStr=''

    ret.content = $(elem).html()

    if (elem.previousSibling && elem.previousSibling.nodeValue) {
      beforeStr = elem.previousSibling.nodeValue.substr(elem.previousSibling.nodeValue.length- dateStringBeforeLength)
    }

    if (elem.nextSibling && elem.nextSibling.nodeValue) {
      afterStr = elem.nextSibling.nodeValue.substr(0, dateStringAfterLength)
    }

    if (elem.attribs['when']) {
      [ ret.notBefore, ret.notAfter ] = parseDate(elem.attribs['when'])
    } else if (elem.attribs['notBefore']) {
      if (elem.attribs['notAfter'] === undefined) {
        throw new Error('notAfter is needed')
      }
      ret.notBefore = parseDate(elem.attribs['notBefore'])[0]
      ret.notAfter = parseDate(elem.attribs['notAfter'])[1]
    } else {
      throw new Error('invalid date' + $(elem).html())
    }

    if (beforeStr.trim()) beforeStr = `...${beforeStr}`
    if (afterStr.trim()) afterStr = `${afterStr}...`

    ret.searchText = `${beforeStr.trim()} <mark>${ret.content.trim()}</mark> ${afterStr.trim()}`

    return ret
  }).get()
}

export function extractXmlData($) {
  const fileId = $('fileDesc').attr('xml:id')

  const teiHeader = $('teiHeader')
  const title = teiHeader.find('titleStmt').find('title[type="main"]').text()
  let type = teiHeader.attr('type')

  const type2 = $('body>div[type]').attr('type')
  let subType = undefined

  if (type2) {
    type = type2
    subType = $('body>div[type]').attr('subtype')
  }

  const fullBody = $('body')

  const corresps = extractCorresps($)
  const dates = extractDates($)

  const fullText = fullBody.text()

  return {
    fileId,
    corresps,
    title,
    type,
    subType,
    fullBody,
    fullText,
    dates,
    keywords: getKeywordsForText(fullText),
  }
}

function resolveTagTypes($tag, $) {
  const tagName = $tag.prop('tagName').toUpperCase()
  let type = undefined, subType = undefined

  switch (tagName) {
    case 'PERSNAME':
      type='person'
      subType = $tag.attr('subType')
      break
    case 'PLACENAME':
      type = 'place'
      subType = $tag.attr('subType')
      break
    case 'HANDNOTE':
      type = 'handNote'
      subType = $tag.attr('scribe')
      break
    case 'GEOGNAME':
      type = 'geographical'
      subType = $tag.attr('subType')
      break
    case 'TITLE':
      type = $tag.attr('type')
      subType = $tag.attr('subtype')
      break
    case 'ORGNAME':
      type = 'organization'
      subType = $tag.attr('subtype')
      break
    case 'REF':
      type = $tag.attr('type')
      subType = $tag.attr('subtype')
      break
    case 'HANDSHIFT':
      break
    case 'NAME':
      type = $tag.attr('type')
      subType = $tag.attr('subType')
      break
    default:
      throw new Error(`Could not resolve tag types: ${$.html($tag)}`)
  }

  if (type === undefined) return undefined

  return { tagName, type, subType }
}

export function readMetaData($) {
  const authors = $('authors').find('author').map((_, elem) => {
    const $elem = $(elem)
    const name = $elem.attr('name')
    const corresp = $elem.attr('corresp')
    const keywords = $elem.find('keywords').find('keyword').map((_, kelem) => $(kelem).html()).get()
    const penNames = $elem.find('pen-names').find('pen-name').map((_, pelem) => $(pelem).attr('handle')).get()

    return {
      name,
      corresp,
      penNames,
      keywords,
    }
  }).get()

  return {
    authors,
  }
}
