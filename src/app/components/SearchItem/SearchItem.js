import cx from 'classnames'
import styles from './SearchItem.module.scss'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { connect } from "react-redux"
import { showHideSearchItemAllMatches } from 'app/modules/search/search.actions'

@connect(null, { showHideSearchItemAllMatches } )
export class SearchItem extends React.Component {
  render() {
    const { document, showHideSearchItemAllMatches } = this.props
    const defaultShowMatches = 2
    
    const showingAllMatches = document.showingAllMatches
    const showinMatches = showingAllMatches?document.matches:document.matches.slice(0, defaultShowMatches)
    
    return (
      <div className={cx('SearchItem', styles.SearchItem)}>
        {document.title && <div className='title'>
          <a href={`http://ruskin.local:8080/src/witnesses/${document.fileId}.php`} target='_blank'>
            <strong>{document.title}</strong>
          </a>
        </div>}
        
        
        <div className='docTypeContainer'>
          Document: <strong className='docType'> {document.type}
            {document.subType && (
              <span className='subType'>
            &nbsp;({document.subType})</span>
            )}
          </strong>
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
            onClick={() => showHideSearchItemAllMatches(document.id, !showingAllMatches)}>
            
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
