import SearchBox from './SearchBox'
import sinon from 'sinon'

describe(`Search Box Component`, function () {
  const shallowSB = props => shallow(<SearchBox {...props} />)
  
  beforeEach(() => {
    this.wrapper = shallowSB()
  })
  
  it(`has class as className`, () => {
    expect(this.wrapper.hasClass('SearchBox')).to.equal(true)
  })
  
  it(`has search form`, () => {
    expect(this.wrapper).to.have.length(1)
  })
  
  it(`has all the fields`, () => {
    expect(this.wrapper.find('#searchText')).to.have.length(1)
    expect(this.wrapper.find('#fullTextCheckbox')).to.have.length(1)
    
    // search button
    expect(this.wrapper.find('button')).to.have.length(1)
    
    
    expect(this.wrapper.find('#searchIn')).to.have.length(1)
    expect(this.wrapper.find('#docType')).to.have.length(1)
    expect(this.wrapper.find('#subDocType')).to.have.length(1)
  })
  
  it(`has sub doc type hidden by default`, () => {
    expect(this.wrapper.find('#subDocType').parent().name()).to.equal('label')
    
    expect(this.wrapper.find('#subDocType').parent().hasClass('hidden')).to.equal(true)
  })
  
  describe('props are being assigned', function () {
    beforeEach(() => {
      this.spy = sinon.spy()
      this.wrapper = shallowSB({
        handleSearchClick: this.spy,
        searchText: 'abcd',
        subDocType: '',
        docType: '',
        fullTextChecked: true,
        searchIn: '',
      })
    })
    
    it(`search button returning callback`, () => {
      const button = this.wrapper.find('button')
      
      button.simulate('click')
      
      expect(this.spy.calledOnce).to.equal(true)
    })
  })
})
