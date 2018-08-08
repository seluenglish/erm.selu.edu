import SearchItem from './SearchItem'
import sinon from 'sinon'

describe(`Search Item Component`, function () {
  const shallowSB = props => shallow(<SearchItem {...props} />)
  
  beforeEach(() => {
    this.wrapper = shallowSB({
      handleSearchClick: () => {},
      searchText: '',
      searchIn: '',
      docType: '',
      subDocType: '',
    })
  })
 
})
