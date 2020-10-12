import { connect } from 'react-redux'
import DocumentMeta from 'react-helmet'
import { hot } from 'react-hot-loader'
import SearchBox from 'app/components/SearchBox/SearchBox'
import SearchItem from 'app/components/SearchItem/SearchItem'
import { getSearch } from 'app/modules/search/search.selectors'
import { apiSearch, updateSearchParams } from 'app/modules/search/search.actions'

@connect(state => ({
  search: getSearch(state),
}), { apiSearch, updateSearchParams })
class SearchRoute extends React.Component {
  constructor(props) {
    super(props)

    this.search = this.search.bind(this)
  }


  search(params) {
    const { updateSearchParams, apiSearch } = this.props

    updateSearchParams(params)
    apiSearch(params)
  }

  render() {
    let searchResults = !!(this.props.search.searchResults)

    const { listItems, totalHits, totalDocumentHits } = searchResults ? this.props.search.searchResults : Object
    const { searchText } = this.props.search.searchParams

    return (
      <section className='SearchRoute'>
        <DocumentMeta>
          <title />
        </DocumentMeta>

        <SearchBox
          handleSearchClick={this.search}
          queryString={this.props.location.search}
        />

        {searchResults
        && (
          <div className='searchResults'>

            <h2 className='searchResultsLabel'>
              Search results for &quot;{searchText}&quot; :
            </h2>

            <h3 className='resultTotalItems'>
              Found &nbsp;
              <span className='highlighted'>{totalHits}</span>
              &nbsp; results in &nbsp;
              <span className='highlighted'>{totalDocumentHits}</span>
              &nbsp; documents:
            </h3>

            {listItems.map((item, index) => (
              <div key={index}>
                <SearchItem document={item} />
              </div>
)
            )}
          </div>
        )}

      </section>
    )
  }
}

export default hot(module)(SearchRoute)

