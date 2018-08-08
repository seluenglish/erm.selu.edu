import { parseXmlFile, resolveXmlFilePath, getNames, findXmlsInDirs, extractData } from './xml-parser'

describe('helpers/XML parser', function () {
  describe('xml files finder', function () {
    it(`finds all XMLs in a single directory`)
    it(`excludes non XML files`)
    
    it(`avoids duplicates`)
    
    it(`returns list`)
  })
  
  describe('XML path resolver', function () {
    it(`can resolve file`)
    it(`gets file with higher priority`)
  })
  
  describe('XML file parser', function () {
    it(`parses valid XML files`)
    it(`rejects invalid XML files`)
  })
  
  describe('XML data/metadata extractor', function () {
    it(`sets titles when it exists`)
    it(`excludes titles for gloss files`)
    it(`sets proper document types`)
    it(`reads full text`)
    it(`gets filePath`)
    
    it(`traverses through xi:includes`)
  })
  
  describe(`getNames() function`, function () {
    it(`gets all corresp tags`)
    it(`can read placeName`)
    it(`can read persName`)
    it(`removes duplicates`)
  })
})
