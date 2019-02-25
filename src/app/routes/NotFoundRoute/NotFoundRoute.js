import DocumentMeta from 'react-helmet'
import { hot } from 'react-hot-loader'
import { notFoundRoute } from 'app/copy'
import { Redirect } from 'react-router-dom'
import { SERVER_SHOWCASE_DIRECTORY } from 'config/constants'

class NotFoundRoute extends React.Component {
  // TODO remove this
  componentDidMount() {
    const { pathname } = this.props.location
    const w = window

    const a = w.document.createElement('a')
    a.href = `${SERVER_SHOWCASE_DIRECTORY}${pathname}`

    if (!a.pathname.endsWith('/')) {
      a.pathname += '.php'
    }
    // window.location = a.href
  }

  render() {
    return (
      <section className='NotFoundRoute'>
        <DocumentMeta>
          <title>{notFoundRoute.title}</title>
        </DocumentMeta>
        {notFoundRoute.content}
      </section>
    )
  }
}

export default hot(module)(NotFoundRoute)
