import { ADD_MESSAGE } from 'app/modules/server-update-db/server-update-db.constants'
import { isPasswordCorrect } from 'server/serverHelpers/authenticator'
import {
  findXmlsInDirs,
  resolveXmlFilePath,
  parseXmlFile,
  extractXmlData,
} from 'server/serverHelpers/xml-helper'
import { getUrl } from 'helpers/url-helper'
import { Document, Name, DateModel } from 'server/database/models'
import { XML_PATH } from 'server/config'
import path from 'path'
import mongoose from 'mongoose'
import _ from 'lodash'

const ObjectId = mongoose.Types.ObjectId

const LOG_INFO = 'INFO'
const LOG_WARNING = 'WARNING'
const LOG_ERROR = 'ERROR'
const LOG_FATAL = 'FATAL'
const LOG_LEVELS = [ LOG_INFO, LOG_WARNING, LOG_ERROR, LOG_FATAL ]

export default async function updateDb(payload, client) {
  const store = global.store

  const log = (message) => {
    let level = LOG_INFO

    if (Array.isArray(message) ) {
      [ level, message ] = message
    }

    console.log(`${level} `, message)

    store.dispatch({
      type: ADD_MESSAGE,
      meta: { client },
      payload: { level, message },
    })
  }

  const clientPassword = payload.password

  if (!isPasswordCorrect(clientPassword)) {
    log('wrong password')
  } else {
    log('updating db')

    const allNames = []
    const allDocs = []
    let allDates = []

    const dirPath = [ path.join(XML_PATH, '_Completed/') ]
    log('locating XML files')
    let xmls = await findXmlsInDirs(dirPath)
    log(`${xmls.length} XML files discovered`)

    // xmls = [ 'witnesses/saltzburg_fo.xml' ]
    // xmls = [ 'glosses/andernacht_glosses_contextual.xml' ]
    // xmls = [ 'corpuses/account_of_a_tour_on_the_continent_le_corpus_therhine.xml' ]

    const validateDoc = (xmlData, doc) => {
      if (!xmlData) log([ LOG_ERROR, 'XML data could not be parsed.' ])
      if (!doc) log([ LOG_ERROR, 'database document could not be created.' ])

      if (!doc.title)
        log( [ LOG_WARNING, 'document has no title.' ])

      if (!doc.type)
        log( [ LOG_WARNING, 'document type not found.' ])
    }

    const processFile = async (xmlFileName, docIndex) => {
      log()
      log(`processing ${docIndex+1}. ${xmlFileName}`)
      const resolved = resolveXmlFilePath(xmlFileName, dirPath)
      log(`resolved to ${resolved}`)

      const xml = parseXmlFile(resolved)

      try {
        log(`extracing data from XML`)
        const data = extractXmlData(xml)

        log(`converting xml data to db rows`)

        log(`creating document row`)
        const doc = Document({
          _id: ObjectId(),
          fileId: data.fileId,
          title: data.title,
          type: data.type,
          subType: data.subType,
          fullText: data.fullText,
          names: [],
          url: getUrl(`${data.docType}/${data.fileId}`),
          keywords: data.keywords,
        })
        allDocs.push(doc)

        log(`validating...`)
        validateDoc(data, doc)
        log(`validated.`)

        if (data.dates.length) {
          const thisDates = data.dates.map(x => new DateModel({ _id: ObjectId(), ...x }))
          doc.dates = thisDates

          allDates = allDates.concat(thisDates)
        }
        if (data.corresps.length) {
          const namesInThisDoc = data.corresps
          namesInThisDoc.forEach(n => {
            let nameObj = allNames.find(x => x.type === n.type && x.corresp === n.corresp)

            if (!nameObj) {
              nameObj = Name({
                _id: ObjectId(),
                ...n,
              })

              // log(`using new name ${nameObj.text}`)
              allNames.push(nameObj)
            } else {
              // log(`using existing name ${nameObj.text}`)
            }

            n.nameObj = nameObj
          })

          const uniqueNamesInThisDoc = _.uniq(namesInThisDoc.map(n => n.nameObj))

          doc.names = uniqueNamesInThisDoc

          log(`found ${uniqueNamesInThisDoc.length} unique names in document ${xmlFileName}: `)
          log(uniqueNamesInThisDoc.map((name, i) => {
            return `${i+1}: ${name.text}`
          }).join('\t'))
        } else {
          log(`no names in this document.`)
        }
      } catch (e) {
        log([ LOG_ERROR, `unable to process ${xmlFileName}` ])
        log([ LOG_ERROR, e.message ])
        log([ LOG_ERROR, e.stack ])
      }
    }

    await xmls.forEach(processFile)

    log(`total documents Length: ${allDocs.length}`)
    log(`total names length: ${allNames.length}`)
    log(`total dates length: ${allDates.length}`)

    log(`removing existing names`)
    await Name.remove({})

    log(`removing existing documents`)
    await Document.remove({})

    log(`removing existing dates`)
    await DateModel.remove({})

    log(`Saving new names`)
    await Name.insertMany(allNames)
    log(`Names saved`)

    log(`Saving dates`)
    await DateModel.insertMany(allNames)
    log(`Dates saved.`)

    log(`Saving new documents`)
    await Document.insertMany(allDocs)
    log(`Documents saved`)
    log()
    log()
    log(`All done.`)
  }
}
