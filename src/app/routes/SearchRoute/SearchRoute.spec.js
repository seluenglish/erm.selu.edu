import SearchRoute from './SearchRoute'
import SearchBox from 'app/components/SearchBox/SearchBox'

describe(`SearchRoute Component`, function () {
  const shallowSR = (props) => shallow(<SearchRoute {...props} />)
  
  beforeEach(() => {
    this.wrapper = shallowSR()
  })
  
  it(`has className`, () => {
    expect(this.wrapper.hasClass('SearchRoute')).to.equal(true)
  })
  
  it(`has the search box`, () => {
    expect(this.wrapper.find(SearchBox)).to.have.length(1)
  })
})

