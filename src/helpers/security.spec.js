import { createHash, verifyHash, HashError, rawHash } from './security'

describe('helpers/security.js', function () {
  describe(`hash function`, function () {
    beforeEach(() => {
      this.plain = 'sdkfjdkdfkjdfklsjfdkljdksljkdfl'
      this.hash = createHash(this.plain)
      this.result = verifyHash(this.plain, this.hash)
    })
    
    it(`has right attributes`, () => {
      expect(this.hash).to.have.property('hash')
      expect(this.hash).to.have.property('date')
      expect(this.hash).to.not.have.property('plain')
      
      expect(this.result).to.be.a('boolean')
    })
    
    it(`is working`, () => {
      expect(this.result).to.equal(true)
    })
    
    it(`declines wrong hashes`, () => {
      this.hash.hash = 'some_random_len_128_string1234567_skdfkdsfji_am_the_biggest_alien_fan_1213aksdfjksdfjkadsjfkdjaklfjdkljfalkjklafjklajfkjkljsadkf'
      
      this.result = verifyHash(this.plain, this.hash)
      
      expect(this.result).to.equal(false)
    })
    
    it(`declines improper length hashes`, () => {
      this.hash.hash = 'abcdefgh'
      
      expect(verifyHash.bind(process, this.plain, this.hash)).to.throw(HashError)
    })
    
    it(`has proper hash length`, () => {
      expect(this.hash.hash.length).to.equal(128)
    })
    
    it(`has createHash() working`, () => {
      expect(rawHash('batman')).to.equal('5e325d89a5fceb1ba257f50d7e7c1a807ae8b19756e252c326c44e84e357749d3e780b7db1fb32ec029e7850d3b0bba032a33611d2a54a1db8097c81f2b23814')
    })
  })
})
