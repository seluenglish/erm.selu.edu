import cx from 'classnames'
import styles from './SearchItem.module.scss'
import PropTypes from 'prop-types'
import Document from "models/document"

export default class SearchItem extends React.Component {
  render() {
    const {document} = this.props
    
    console.log(styles);
    
    return (
      <div className={cx('SearchItem', styles.SearchItem)}>
        {document.title && <div className='title'>
          Title: <strong>{document.title}</strong>
        </div>}
        
        
        <div className='docTypeContainer'>
          Document type: <strong className='docType'> {document.docType}
          {document.subDocType && <span className='subDocType'>
            &nbsp;({document.subDocType})</span>}
        </strong>
        </div>
        
        <div className='text'>
          {document.text}
        </div>
      </div>
    
    )
  }
}

SearchItem.propTypes = {
  document: PropTypes.instanceOf(Document)
  
}
