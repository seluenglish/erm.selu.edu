import { parseXmlFile, getNames } from 'helpers/xml-parser'

export const FROM_DB = 'FROM_DB'
export const FROM_XML = 'FROM_XML'

export default class Document {
  constructor() {
    this.dbId = undefined
    
    this.docType = undefined
    this.subDocType = undefined
  
    this.title = undefined
    this.text = undefined
    
    this.fileName = undefined
    this.filePath = undefined
    this.url = undefined
    
    this.names = undefined
    
    this.loadMethod = undefined
  }
  
  static fromFile(filePath) {
    const parsedXml = parseXmlFile(filePath)
    return Document.fromParsedXML(parsedXml)
  }
  
  static fromDB(dbRow) {
    const ret = new Document()
    
    ret.loadMethod = FROM_DB
    return ret
  }
  
  static fromParsedXML(xml) {
    const ret = new Document()
    
    ret.loadMethod = FROM_XML
    return ret
  }
  
}
