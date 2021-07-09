import cx from 'classnames'
import styles from './SearchItem.module.scss'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import { showHideSearchItemAllMatches } from 'app/modules/search/search.actions'
import { getDocumentUrl } from 'helpers/document-helpers'
import { animateScroll } from 'react-scroll'
// import { uuid } from 'helpers/id-helper'

@connect(null, { showHideSearchItemAllMatches } )
export class SearchItem extends React.Component {
  constructor(props) {
    super(props)

    this.handleToggleMoreMatches = this.handleToggleMoreMatches.bind(this)

    this.ref = React.createRef()
  }

  handleToggleMoreMatches() {
    const { document, showHideSearchItemAllMatches } = this.props
    const showingAllMatches = document.showingAllMatches
    const newState = !showingAllMatches


    if (newState === false) {
      const top = this.ref.current.offsetTop
      animateScroll.scrollTo(top, {
        duration: 500,
        // smooth: 'easeOutExpo',
      })
    }

    showHideSearchItemAllMatches(document.id, newState)
  }

  render() {
    const { document } = this.props
    const defaultShowMatches = 2

    const { uuid } = this

    const showingAllMatches = document.showingAllMatches
    const showinMatches = showingAllMatches?document.matches:document.matches.slice(0, defaultShowMatches)

    return (
      <div className={cx('SearchItem', styles.SearchItem)} ref={this.ref}>

        {document.title && (
        <div className='title'>
          <Link to={getDocumentUrl(document)}>
            <strong>{document.title}</strong>
          </Link>
        </div>
)}


        <div className='docTypeContainer'>
          Document type: <strong className='docType'> {document.type}
            {document.subType && (
              <span className='subType'>
            &nbsp;({document.subType})</span>
            )}
          </strong>
          <br />
          File ID: <strong className='docType'> {document.fileId} </strong>
        </div>

        <div className='text'>
          {document.fullText}
        </div>

        <div className='matches'>
          {showinMatches.map((x, i) => (
            <div
              className='match'
              key={i}
              dangerouslySetInnerHTML={{ __html: x.showText }}
            />
          ))}
        </div>
        {document.matches.length>defaultShowMatches && (
          <button
            type='button'
            className='showAllItems'
            onClick={this.handleToggleMoreMatches}>

            {showingAllMatches && ('Less')}
            {!showingAllMatches && (
              `Show all ${document.matches.length} matches`
            )}

          </button>
        )}
      </div>

    )
  }
}

SearchItem.propTypes = {
  document: PropTypes.object.isRequired,

}

export default hot(module)(SearchItem)
