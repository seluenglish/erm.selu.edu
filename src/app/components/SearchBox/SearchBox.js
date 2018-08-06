import cx from 'classnames'
import styles from './SearchBox.module.scss'
import PropTypes from 'prop-types'

export default class SearchBox extends React.Component {
  render() {
    const { searchText, subDocType, fullTextChecked, handleSearchClick, searchIn, docType } = this.props
    
    return (
      <form
        className='SearchBox'
        style={styles}>
        <fieldset>
          <legend>Advanced Search</legend>
          <div className='searchFields'>
            <div className={'firstBox'}>
              <input
                type={'text'}
                name={'searchText'}
                id={'searchText'}
                defaultValue={searchText}
                placeholder={'Search for a keyword or phrase...'}
              />
              <label htmlFor='fullTextCheckbox'>
                <input
                  type='checkbox'
                  name='fullText'
                  id='fullTextCheckbox'
                  defaultChecked={fullTextChecked}
                />
                Search full text of documents</label>
            </div>
            <div className='secondBox'>
              <button
                type='button'
                onClick={handleSearchClick}
                className={cx(
                  {
                    btn: true,
                  }
                )}>Search
              </button>
            </div>
            <div className='thirdBox'>
              <label htmlFor='searchIn'>
                Search in:
                <select id='searchIn' defaultValue={searchIn}>
                  <option>A</option>
                  <option>B</option>
                </select>
              </label>
          
              <label htmlFor='docType'>
                Doc Type:
                <select id='docType' defa={docType}>
                  <option>A</option>
                  <option>B</option>
                </select>
              </label>
          
              <label
                htmlFor='subDocType'
                className={cx(
                  {
                    hidden: true,
                  }
                )}>
                Subdoc type:
                <select id='subDocType' value={subDocType}>
                  <option>A</option>
                  <option>B</option>
                </select>
              </label>
            </div>
          </div>
        </fieldset>
  
      </form>
    )
  }
}

SearchBox.propTypes = {
  handleSearchClick: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  fullTextChecked: PropTypes.bool,
  searchIn: PropTypes.string.isRequired,
  docType: PropTypes.string.isRequired,
  subDocType: PropTypes.string.isRequired,
  
}
