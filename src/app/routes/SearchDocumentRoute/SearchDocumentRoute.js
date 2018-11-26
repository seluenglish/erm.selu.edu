import DocumentMeta from 'react-helmet'
import { hot } from 'react-hot-loader'
import { notFoundRoute } from 'app/copy'
import { Redirect } from 'react-router-dom'
import { SERVER_ROOT } from '../../../helpers/url-helper'
import { connect } from 'react-redux'
import { getSearchDocument, getError, getIsPending } from 'app/modules/search-document/search-document.selectors'
import { apiGetDocument } from 'app/modules/search-document/search-document.actions'

@connect(state => ({
  searchDocument: getSearchDocument(state),
  error: getError(state),
  isPending: getIsPending(state),
}), { apiGetDocument })
class SearchDocumentRoute extends React.Component {
  componentDidMount() {
    this.reload()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.reload()
    }
  }

  async reload() {
    const { pathname } = this.props.location

    this.props.apiGetDocument(pathname)
  }

  render() {
    const data = this.props.searchDocument
    const { error, isPending } = this.props
    const body = data?data.body : null
    const title = data?data.title : 'Loading...'

    return (
      <section className='SearchDocumentRoute'>
        <DocumentMeta>
          <title>{title}</title>
        </DocumentMeta>

        {!error && <div dangerouslySetInnerHTML={body} />}

        {error && (<div>
          Oops! Page not found.
        </div>)}
      </section>
    )
  }
}

export default hot(module)(SearchDocumentRoute)
