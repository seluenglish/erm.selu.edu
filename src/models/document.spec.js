import Document from './document'

describe(`Document model`, function () {
  it(`exposes fromFilePath() static method`)
  it(`exposes fromDBrow() static method`)
  it(`exposes fromParsedXML() static method`)
  
  describe(`parse XML file`, function () {
    it(`can parse an XML file`)
    it(`rejects malformed XMLs`)
    it(`assigns right properties and leaves extra fields untouched`)
    it(`assigns right values`)
  })
  
  describe(`parse db row`, function () {
    it(`can parse a db row`)
    it(`assigns right properties and leaves extra fields untouched`)
    it(`assigns right values`)
  })
  
})
