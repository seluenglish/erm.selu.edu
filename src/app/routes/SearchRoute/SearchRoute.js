import DocumentMeta from 'react-helmet'
import { hot } from 'react-hot-loader'
import SearchBox from 'app/components/SearchBox/SearchBox'

class SearchRoute extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      searchText: 'helloWorld',
      fullTextChecked: true,
      searchIn: '',
      docType: '',
      subDocType: '',
    }
  }
  
  search() {
    console.log('searching')
  }
  
  render() {
    const { searchText, fullTextChecked, searchIn, docType, subDocType } = this.state
    
    return (
      <section className='SearchRoute'>
        <DocumentMeta>
          <title />
        </DocumentMeta>
        Searching...
        
        <SearchBox
          handleSearchClick={this.search.bind(this)}
          searchText={searchText}
          fullTextChecked={fullTextChecked}
          docType={docType}
          subDocType={subDocType}
          searchIn={searchIn}
        />
      
      </section>
    )
  }
}

export default hot(module)(SearchRoute)

