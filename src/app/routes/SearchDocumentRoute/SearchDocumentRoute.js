import DocumentMeta from 'react-helmet'
import {replace, push} from 'react-router-redux'
import {browserHistory} from 'react-router'
import {hot} from 'react-hot-loader'
import {notFoundRoute} from 'app/copy'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSearchDocument, getError, getIsPending} from 'app/modules/search-document/search-document.selectors'
import {apiGetDocument} from 'app/modules/search-document/search-document.actions'
import {SERVER_SHOWCASE_DIRECTORY} from 'config/constants'
import cx from 'classnames'
import * as R from 'ramda'
import { isWitnessPath } from 'helpers/showcase-helper'
import { redirectShowcaseElem } from 'app/utils/showcase'

@connect(state => ({
  searchDocument: getSearchDocument(state),
  error: getError(state),
  isPending: getIsPending(state),
}), {push, apiGetDocument})
class SearchDocumentRoute extends React.Component {
  constructor(props) {
    super(props)

    this.mainBody = null
    this.handleMainBodyLinkClick = this.handleMainBodyLinkClick.bind(this)
    this.gotNewMainBodyRef = this.gotNewMainBodyRef.bind(this)
  }

  componentDidMount() {
    this.getDocument()
  }

  componentWillReceiveProps(props, oldProps) {
    if (!props) return

    setTimeout(() => this.highlightHash())
  }

  shouldComponentUpdate(nextProps) {

    const {props} = this


    // different data
    if (!R.equals(props.searchDocument, nextProps.searchDocument)) return true

    // same location
    if (R.equals(props.location, nextProps.location)) return false

    const picker = R.pick([ 'pathname', 'search', 'state' ])

    // if location change is only hash change, return false
    return !R.equals(picker(props.location), picker(nextProps.location));

  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getDocument()
    }
  }

  highlightHash() {
    const elem = this.getHashElement()

    if (elem) {
      // highlight active glosses
      elem.classList.add('active')
    }
  }

  isValidHash() {
    return !!this.getHashElement()
  }

  getHashElement() {
    const { props } = this

    let id = props.location.hash
    if (!id) return

    id = id.replace('#', '')


    const elem = window.document.getElementById(id)

    return elem
  }

  scrollToHash() {
    const elem = this.getHashElement()

    if (elem) {
     const pos = { x: 0, y: elem.offsetTop }

      requestAnimationFrame(() => {
        window.scroll(pos.x, pos.y)
      })

    }


  }

  handleMainBodyLinkClick(e, targetThis) {
    const {push} = this.props

    e.preventDefault()

    if (targetThis.host === window.location.host) {
      const target = targetThis.pathname + targetThis.hash

      push(targetThis.pathname + targetThis.hash)
    }
  }

  gotNewMainBodyRef(el) {
    this.mainBody = el
    const parent = this

    if (this.mainBody) {
      const elements = this.mainBody.getElementsByTagName('a')
      for (let i = 0; i < elements.length; i++) {
        const elem = elements[i]

        elem.addEventListener('click', function (e) {
          parent.handleMainBodyLinkClick(e, this)
        })
      }
    }
  }

  async getDocument() {
    const {pathname} = this.props.location
    let {hash} = window.location

    if (isWitnessPath(pathname)) {
      return redirectShowcaseElem(pathname, hash)
    }

    this.props.apiGetDocument(pathname)
  }

  render() {
    const data = this.props.searchDocument
    const {error, isPending} = this.props
    const body = data ? data.body : null
    const title = data ? data.title : 'Loading...'

    if (error) return null
    return (
      <section className='SearchDocumentRoute'>
        <DocumentMeta>
          <title>{title}</title>
        </DocumentMeta>

        <div
          className='mainBody'
          ref={this.gotNewMainBodyRef.bind(this)}
          dangerouslySetInnerHTML={body}/>


      </section>
    )
  }
}

export default hot(module)(SearchDocumentRoute)
