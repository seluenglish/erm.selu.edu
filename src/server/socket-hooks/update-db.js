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
import path from 'path'
import mongoose from 'mongoose'
import _ from 'lodash'
import { LOG_INFO, LOG_DEBUG, LOG_ERROR } from 'server/serverHelpers/logging'
import { createValidator } from 'server/serverHelpers/xml-document-validator'


const ObjectId = mongoose.Types.ObjectId


export default async function updateDb(payload, client) {
  const store = global.store

  const { password, wordCount, showErrors, updateSearchDb, showDebug } = payload

  const log = (message) => {
    let level = LOG_INFO

    if (Array.isArray(message) ) {
      [ level, message ] = message
    }

    if (!showDebug && level === LOG_DEBUG ) return
    if (!showErrors && level === LOG_ERROR ) return

    if (message) {
      console.log(`${level} `, message)
    }
    else
      console.log()

    store.dispatch({
      type: ADD_MESSAGE,
      meta: { client },
      payload: { level, message },
    })
  }


  if (!isPasswordCorrect(password)) {
    log('wrong password')
  } else {
    log('Updating db')

    const allNames = []
    const allDocs = []
    let allDates = []

    const dirPath = process.env.NODE_ENV === 'production'
      ?[ process.env.XML_PATH ]
      :[ path.join(process.env.XML_PATH, '_Completed'), path.join(process.env.XML_PATH, '_In_Process') ]

    log('Locating XML files')
    let xmls = await findXmlsInDirs(dirPath)
    log(`${xmls.length} XML files discovered`)
    log()

    const validateDoc = createValidator(log)

    // xmls = [ 'witnesses/lille_poem_le.xml' ]
    // xmls = [ 'glosses/andernacht_glosses_contextual.xml' ]
    // xmls = [ 'corpuses/account_of_a_tour_on_the_continent_msia_g1_corpus.xml' ]

    const processFile = async (xmlFileName, docIndex) => {
      log(`Processing ${docIndex+1}. ${xmlFileName}`)
      const resolved = resolveXmlFilePath(xmlFileName, dirPath)
      log([ LOG_DEBUG, `resolved to ${resolved}` ])

      const xml = parseXmlFile(resolved)

      try {
        const data = extractXmlData(xml)

        if (data.type === 'title') {
          log(`Skipping title file...`)
          return
        }

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

        if (!validateDoc(data, doc)) {
          log([ LOG_ERROR, `Invalid document.` ])
          return
        }

        allDocs.push(doc)

        if (updateSearchDb) {

          if (data.dates.length) {
            const thisDates = data.dates.map(x => new DateModel({ _id: ObjectId(), ...x }))
            doc.dates = thisDates

            allDates = allDates.concat(thisDates)
          }

          // process names
          const namesInThisDoc = data.corresps

          // document title is in itself a name
          namesInThisDoc.unshift({
            text: data.title,
            type: 'docTitle',
          })
          namesInThisDoc.forEach(n => {
            let nameObj = allNames.find(x => {
              if (x.type === 'docTitle') return false // skip finding any existing docTitle.

              return x.type === n.type && x.corresp === n.corresp
            })

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


          // find unique names
          const uniqueNamesInThisDoc = _.uniq(namesInThisDoc.map(n => n.nameObj))

          doc.names = uniqueNamesInThisDoc

          log(`Found ${uniqueNamesInThisDoc.length} unique names in document ${xmlFileName}: `)
          log(uniqueNamesInThisDoc.map((name, i) => {
            return `${i + 1}: ${name.text}`
          }).join('\t'))

        }
        if (wordCount) {
          const words = doc.fullText.split(' ').filter(x => !!x).length
          doc.wordCount = words
          log(`Word count: ${words}`)
        }
      } catch (e) {
        log([ LOG_ERROR, `Unable to process ${xmlFileName}` ])
        log([ LOG_ERROR, e.message ])
        log([ LOG_ERROR, e.stack ])
      }
      log()
    }

    await xmls.forEach(processFile)

    if (wordCount) { // aggregate word counts
      const types = _.groupBy(allDocs, x => {
        if (!x.type) return 'documents without types'

        return `${x.type}`
      })

      Object.keys(types).forEach(key => {
        log(`Number of files of type ${key}: ${types[key].length}`)
        const numWords = _.sum(types[key].map(x => x.wordCount))
        log(`Number of words in this category: ${numWords}`)
        log()
      })

      const subTypes = _.groupBy(allDocs, x => {
        if (!x.type || !x.subType) return ''

        return `${x.type} -> ${x.subType}`
      })

      delete subTypes['']

      Object.keys(subTypes).forEach(key => {
        log(`Number of files of sub-type in ${key}: ${subTypes[key].length}`)
        const numWords = _.sum(subTypes[key].map(x => x.wordCount))
        log(`Number of words in this category: ${numWords}`)
        log()
      })

    }
    if (updateSearchDb) {
      log(`Found ${allDocs.length} total documents.`)
      log(`Found ${allNames.length} total names.`)
      log(`Found ${allDates.length} total dates.`)

      log(`Removing existing names`)
      await Name.remove({})

      log(`Removing existing documents`)
      await Document.remove({})

      log(`removing existing dates`)
      await DateModel.remove({})

      log(`Saving new names`)
      await Name.insertMany(allNames)
      log(`Names saved`)

      log(`Saving dates`)
      await DateModel.insertMany(allDates)
      log(`Dates saved.`)

      log(`Saving new documents`)
      await Document.insertMany(allDocs)
      log(`Documents saved`)
    }


    log()
    log()
    log(`All done.`)
  }
}
