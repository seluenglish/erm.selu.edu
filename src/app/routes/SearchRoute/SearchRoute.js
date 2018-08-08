import DocumentMeta from 'react-helmet'
import { hot } from 'react-hot-loader'
import SearchBox from 'app/components/SearchBox/SearchBox'
import SearchItem from 'app/components/SearchItem/SearchItem'
import Document from 'models/document'

class SearchRoute extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      searchText: 'helloWorld',
      fullTextChecked: true,
      searchIn: '',
      docType: '',
      subDocType: '',
      searchItems: [
        new Document,
        new Document,
      ],
    }
  
    this.state.searchItems[0].title = '"Cadenabbia" [poem]'
    this.state.searchItems[0].docType = 'poem'
    this.state.searchItems[0].subDocType = 'Fiction'
    this.state.searchItems[0].text = '"...Cadenabbia Oh love coolly came on Comos lake The lovely beams of morning mild, That oer the Lecco mountains break, And red their summits piled,1420 That high above their dim shore, Their weary winter garments bore, The broad boat lay along the tide The ligh..."'
  
    this.state.searchItems[1].title = '[EVENING AT CHAMOUNI]'
    this.state.searchItems[1].docType = 'poem'
    this.state.searchItems[1].subDocType = 'non-fiction'
    this.state.searchItems[1].text = '"...[EVENING AT CHAMOUNI] NOT such the night whose stormy might Heroic Balmat braved, When, darkening on the Goûtéʼs height, The tempest howled and raved. Upon the mighty hill, forlorn, He stood alone amid the storm; Watching the last day gleams decay, Sup..."'
  
  }
  
  search() {
    console.log('searching')
  }
  
  render() {
    const { searchText, fullTextChecked, searchIn, docType, subDocType, searchItems } = this.state
    
    return (
      <section className='SearchRoute'>
        <DocumentMeta>
          <title />
        </DocumentMeta>
        
        <SearchBox
          handleSearchClick={this.search.bind(this)}
          searchText={searchText}
          fullTextChecked={fullTextChecked}
          docType={docType}
          subDocType={subDocType}
          searchIn={searchIn}
        />
        
        {searchItems.map((item, index) => (
          <div key={index}>
            <SearchItem document={item} />
          </div>
        ))}
        
      </section>
    )
  }
}

export default hot(module)(SearchRoute)

