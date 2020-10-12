import React from 'react'
import requestAnimationFrame from 'raf'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import { getSearchDocument } from 'app/modules/search-document/search-document.selectors'

export const memoryStore = {
  _data: new Map(),
  get(key) {
    if (!key) {
      return null
    }

    return this._data.get(key) || null
  },
  set(key, data) {
    if (!key) {
      return
    }
    return this._data.set(key, data)
  },
}

/**
 * Component that will save and restore Window scroll position.
 */
@connect(state => ({
  searchDocument: getSearchDocument(state),
}), {})
export class ScrollManager extends React.Component {
  constructor(props) {
    super(props)
  }

  restoreScrollPosition(pos) {
    pos = pos || this.props.scrollStore.get(this.props.scrollKey) || { x: 0, y: 0 }

    setTimeout(() => {

      const hashElem = this.getHashElement()
      if (hashElem) {
        pos = { x: 0, y: hashElem.offsetTop }
      }

      requestAnimationFrame(() => {
        window.scroll(pos.x, pos.y)
      })
    }, 5)
  }

  saveScrollPosition(key) {
    const pos = getScrollPosition()
    const { hash } = this.props
    key = key || this.props.scrollKey
    this.props.scrollStore.set(key, pos)
  }

  componentDidMount() {
    this.restoreScrollPosition()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.scrollKey !== nextProps.scrollKey) {
      return this.saveScrollPosition()
    }

    if (this.props.hash !== nextProps.hash) {
      return this.scrollToHash(nextProps.hash)
    }

    if (this.props.searchDocument !== nextProps.searchDocument) {
      if (nextProps.searchDocument.body)
        this.restoreScrollPosition()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.scrollKey !== prevProps.scrollKey) {
      this.restoreScrollPosition()
    }
  }

  componentWillUnmount() {
    this.saveScrollPosition()
  }

  getHashElement(hash) {
    hash = hash || this.props.hash

    if (!hash) return

    hash = hash.replace('#', '')

    return window.document.getElementById(hash)
  }

  scrollToHash(hash) {
    const elem = this.getHashElement(hash)

    if (elem) {
      const pos = { x: 0, y: elem.offsetTop }

      requestAnimationFrame(() => {
        window.scroll(pos.x, pos.y)
      })

    }


  }

  render() {
    return null
  }
}

export default hot(module)(ScrollManager)

ScrollManager.defaultProps = {
  scrollStore: memoryStore,
  hash: '',
}

function getScrollPosition() {
  const target = window
  return { x: target.scrollX, y: target.scrollY }
}
