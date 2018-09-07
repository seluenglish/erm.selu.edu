import { ADD_DB_UPDATE_MESSAGE } from 'app/modules/search/search.constants'
import { isPasswordCorrect } from 'server/serverHelpers/authenticator'
import {
  findXmlsInDirs,
  resolveXmlFilePath,
  parseXmlFile,
  extractXmlData,
} from 'server/serverHelpers/xml-helper'
import { getUrl } from 'helpers/url-helper'
import { Document, Name } from 'server/database/models'
import { XML_PATH } from 'server/config'
import path from 'path'
import mongoose from 'mongoose'
import _ from 'lodash'

const ObjectId = mongoose.Types.ObjectId

export default async function updateDb(payload, clientId) {
  const store = global.store
  
  const log = (message) => {
    console.log('[INFO] ', message)
    
    store.dispatch({
      type: ADD_DB_UPDATE_MESSAGE,
      meta: { clientId },
      payload: message,
    })
  }
  

  const clientPassword = payload.password
  
  if (!isPasswordCorrect(clientPassword)) {
    log('wrong password')
  } else {
    log('updating db')
  
    log(`removing existing names`)
    await Name.remove({})
  
    log(`removing existing documents`)
    await Document.remove({})
  
    const allNames = []
    const allDocs = []
  
    const dirPath = [ path.join(XML_PATH, '_Completed/') ]
    log('discovering XML files')
    let xmls = await findXmlsInDirs(dirPath)
    log('XML files discovered')
  
    // xmls = [ 'witnesses/saltzburg_fo.xml', 'witnesses/saltzburg_msviii.xml' ]
    // xmls = [ 'glosses/andernacht_glosses_contextual.xml' ]
    
    const processFile = (xmlFileName, docIndex) => {
      log(`processing ${xmlFileName}`)
      const resolved = resolveXmlFilePath(xmlFileName, dirPath)
      log(`resolved to ${resolved}`)
  
      const xml = parseXmlFile(resolved)
  
      try {
        log(`extracing data afrom XML`)
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
    
        log(`document ${docIndex+1}. ${xmlFileName} saved`)
    
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
          log(namesInThisDoc.map((name, i) => {
            return `${i+1}: ${name.text}`
          }).join('\t'))
        } else {
          log(`no names in this document.`)
        }
      } catch (e) {
        log(`unable to process ${xmlFileName}`)
        log(e)
      }
    }
  
    xmls.forEach(processFile)
    
    log(`total documents Length: ${allDocs.length}`)
    log(`total names Length: ${allNames.length}`)
  
    log(`Saving names`)
    await Name.insertMany(allNames)
    log(`Names saved`)
    
    log(`Saving documents`)
    await Document.insertMany(allDocs)
    log(`Documents saved`)
  }
}
