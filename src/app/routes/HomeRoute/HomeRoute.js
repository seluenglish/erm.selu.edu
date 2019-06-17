import DocumentMeta from 'react-helmet'
import { hot } from 'react-hot-loader'
import SearchDocumentRoute from 'app/routes/SearchDocumentRoute/SearchDocumentRoute'

class HomeRoute extends React.Component {
  render() {
    return (
      <section className='HomeRoute'>

        <DocumentMeta>
          <title />
          <meta name='google-site-verification' content='P0K84BKAT6-EVjbiEHceFww4zyVm-AFqVNNYMxuqLNE' />
          <meta name='msvalidate.01' content='65BED4285B55A1C734258632843D12EA' />
        </DocumentMeta>
        <SearchDocumentRoute location={{ pathname: '/webpages/homepage' }} />
      </section>
    )
  }
}

export default hot(module)(HomeRoute)
