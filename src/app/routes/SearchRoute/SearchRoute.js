import { connect } from 'react-redux'
import DocumentMeta from 'react-helmet'
import { hot } from 'react-hot-loader'
import SearchBox from 'app/components/SearchBox/SearchBox'
import SearchItem from 'app/components/SearchItem/SearchItem'
import { getSearch } from 'app/modules/search/search.selectors'

@connect(state => ({
  search: getSearch(state),
}), {
})
class SearchRoute extends React.Component {
  constructor(props) {
    super(props)
    
    this.search = this.search.bind(this)
  }
  
  componentDidMount() {
  }
  
  search(params) {
    console.log('searching', params)
  }
  
  render() {
    const { searchItems } = this.props.search
    
    return (
      <section className='SearchRoute'>
        <DocumentMeta>
          <title />
        </DocumentMeta>
        
        <SearchBox
          handleSearchClick={this.search}
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

