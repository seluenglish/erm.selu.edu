import _ from 'lodash'
import recursive from 'recursive-readdir'
import path from 'path'
import fs from 'fs'
import cheerio from 'cheerio'
import { getKeywordsForText } from 'helpers/keyword-helper'

export const findXmlsInDirs = async (dirPaths) => {
  if (_.isString(dirPaths)) {
    dirPaths = [ dirPaths ]
  }
  
  const passXmlOnly = (name) => path.extname(name) !== '.xml'
  
  let result = await Promise.all(dirPaths.map(async (dirPath) => {
    const resolvedDirPath = path.resolve(dirPath)
    
    const thisR = await recursive(dirPath, [ passXmlOnly ])
    
    // console.log(dirPath, 'resolved to', resolvedDirPath)
    
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
    withDomLvl1: true
  })
  
  return $
}

export function extractXmlData($) {
  const fileId = $('fileDesc').attr('xml:id')
  
  const teiHeader = $('teiHeader')
  const title = teiHeader.find('titleStmt').find('title[type="main"]').text()
  const docType = teiHeader.attr('type')
  const subDocType = $('body>div[type]').attr('type')
  
  const fullBody = $('body')
  
  const corresps = $('[corresp]').map((_, elem) => {
    const $elem = $(elem)
    const corresp = $elem.attr('corresp')
    const text = $elem.text()
    
    const { tagName, type, subType } = resolveTagTypes($elem, $)
    
    return {
      corresp,
      text,
      tagName,
      type,
      subType,
      keywords: getKeywordsForText(text, corresp),
    }
  }).get()
  
  const fullText = fullBody.text()
  
  return {
    fileId,
    corresps,
    title,
    docType,
    subDocType,
    fullBody,
    fullText,
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
    case 'NAME':
      type = $tag.attr('type')
      subType = $tag.attr('subType')
      break
    default:
      throw new Error(`Could not resolve tag types: ${$.html($tag)}`)
  }
  
  return { tagName, type, subType }
  
}

export function readMetaData($){
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
