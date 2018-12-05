import DocumentMeta from 'react-helmet'
import { hot } from 'react-hot-loader'
import SearchDocumentRoute from '../SearchDocumentRoute/SearchDocumentRoute'

class HomeRoute extends React.Component {
  render() {
    return (
      <section className='HomeRoute'>

        <DocumentMeta>
          <title />
        </DocumentMeta>
        <SearchDocumentRoute location={{ pathname: '/webpages/homepage' }} />
      </section>
    )
  }
}

export default hot(module)(HomeRoute)
