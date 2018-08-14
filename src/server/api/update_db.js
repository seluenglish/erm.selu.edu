// import { Document } from 'server/database/models'
import uuid from 'uuid'
import {
  findXmlsInDirs,
  resolveXmlFilePath,
  parseXmlFile,
  extractXmlData,
  readMetaData,
} from 'server/serverHelpers/xml-helper'
import { Document, Name, Author } from 'server/database/models'
import { getUrl } from 'helpers/url-helper'
import { XML_PATH } from 'server/config'
import path from 'path'

const registeredTokens = []

function log() {
  console.log('[INFO] ', ...arguments)
}

export default async function (ctx) {
  const password = ctx.request.body.password
  
  const realPassword = process.env.DB_UPDATE_PASSWORD
  
  if (password !== realPassword) {
    ctx.response.status = 401
    ctx.response.body = { error: 1, message: 'Wrong password!' }
  }
  
  const token = uuid.v1()
  
  registeredTokens.push(token)
  
  const ret = {
    token
  }
  ctx.response.body = ret
  
  log(`reading metadata xml`)
  const metaDataXml = parseXmlFile(path.join(XML_PATH, 'meta.xml'))
  const metaData = readMetaData(metaDataXml)
  
  metaData.authors.forEach(async authorData => {
    log(`saving author ${authorData.name}`)
    const author = new Author(authorData)
    await author.save()
    log(`author ${authorData.name} saved`)
  })
  
  const dirPath = [ path.join(XML_PATH, '_In_Process/essays'), path.join(XML_PATH, '_Completed/essays') ]
  log('discovering XML files')
  let xmls = await findXmlsInDirs(dirPath)
  log('XML files discovered')
  
  xmls = [ xmls[ 0 ] ]
  
  xmls.forEach(async xmlFileName => {
    log(`processing ${xmlFileName}`)
    const resolved = resolveXmlFilePath(xmlFileName, dirPath)
    log(`resolved to ${resolved}`)
    
    const xml = parseXmlFile(resolved)
    
    log(`read XML`)
    
    const data = extractXmlData(xml)
    
    log(`converting xml data to db rows`)
    log(`creating document row`)
    const doc = new Document({
      fileId: data.fileId,
      title: data.title,
      docType: data.docType,
      subDocType: data.subDocType,
      fullText: data.fullText,
      url: getUrl(`${data.docType}/${data.fileId}`),
      keywords: data.keywords,
    })
    log(`saving document row`)
    await doc.save()
    log('document saved')
    
    data.corresps.forEach(async corresp => {
      log(`saving name ${corresp.text}`)
      const params = {
        ...corresp,
        docId: doc._id,
      }
      const name = new Name(params)
      
      await name.save()
      log(`name ${corresp.text} saved`)
    })
  })
}

