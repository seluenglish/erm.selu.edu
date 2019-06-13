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
        </DocumentMeta>
        <SearchDocumentRoute location={{ pathname: '/webpages/homepage' }} />
      </section>
    )
  }
}

export default hot(module)(HomeRoute)
