import React from 'react'
import requestAnimationFrame from 'raf'

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
  }
}

/**
 * Component that will save and restore Window scroll position.
 */
export default class ScrollPositionManager extends React.Component {
  constructor(props) {
    super(props)
  }

  restoreScrollPosition(pos) {
    pos = pos || this.props.scrollStore.get(this.props.scrollKey) || { x: 0, y: 0 }
    const hash = this.props.scrollKey.split('#')[1]

    console.log('hash is ', `#${hash}`)
    let elem
    if (hash) elem = document.getElementById(hash)

    if (elem) {
      pos = { x: 0, y: elem.offsetTop }
    }

    console.log('hash, elem, pos', hash, elem, pos)

    requestAnimationFrame(() => {
      window.scroll(pos.x, pos.y)
    })
  }

  saveScrollPosition(key) {
    const pos = getScrollPosition()
    key = key || this.props.scrollKey
    this.props.scrollStore.set(key, pos)
  }

  componentDidMount() {
    this.restoreScrollPosition()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.scrollKey !== nextProps.scrollKey) {
      this.saveScrollPosition()
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

  render() {
    return null
  }
}

ScrollPositionManager.defaultProps = {
  scrollStore: memoryStore
}

function getScrollPosition() {
  const target = window
  return { x: target.scrollX, y: target.scrollY }
}
