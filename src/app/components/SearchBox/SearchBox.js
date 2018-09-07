import { connect } from 'react-redux'
import cx from 'classnames'
import styles from './SearchBox.module.scss'
import PropTypes from 'prop-types'
import { getFileTypeSearchOptions, getNameSubTypeSearchOptions, getNameTypeSearchOptions } from 'helpers/document-helpers'
import { getSearch } from 'app/modules/search/search.selectors'
import { apiFetchNameSubTypes, apiFetchNameTypes} from 'app/modules/search/search.actions'
import { Formik, Field, Form } from 'formik'

const InnerForm = (props) => {
  
  const { fullTextChecked } = props
  
  const textPlaceHolder = `Search for ${fullTextChecked ? 'a phrase...' : 'a keyword...'}`
  
  const fileTypeSearchOptions = getFileTypeSearchOptions()
  const nameTypeSearchOptions = getNameTypeSearchOptions()
  
  const nameType = props.values.type;
  const nameSubTypeSearchOptions = (nameType && nameType !== 'all')?getNameSubTypeSearchOptions(nameType):undefined
  const showSubType = (nameSubTypeSearchOptions && nameSubTypeSearchOptions.length>0)
  
  return (
    <Form className='SearchBox' style={styles}>
      <fieldset>
        <legend>Advanced Search</legend>
        <div className='searchFields'>
          <div className={'firstBox'}>
            <Field
              type='text'
              name='searchText'
              id='searchText'
              placeholder={textPlaceHolder}
            />
            <label htmlFor='fullTextChecked'>
              <Field
                type='checkbox'
                name='fullTextChecked'
                id='fullTextChecked'
                checked={fullTextChecked}
              />
              Search full text of documents</label>
          </div>
          <div className='secondBox'>
            <button
              type='submit'
              className={cx(
                {
                  btn: true
                }
              )}>Search
            </button>
          </div>
          <div className='thirdBox'>
            <label htmlFor='searchIn'>
              Search in:
              <Field
                component='select'
                name='searchIn'
                id='searchIn'>
                <option value='all'>All</option>
                
                {fileTypeSearchOptions.map((option, i) => (
                  <option value={option.value} key={i}>{option.label}</option>
                ))}
              </Field>
            </label>
            
            <label htmlFor='type'>
              Show:
              <Field
                component='select'
                name='type'
                id='type'>
                <option value='all'>All</option>
                {nameTypeSearchOptions.map((option, i) => (
                  <option value={option.value} key={i}>{option.label}</option>
                ))}
              </Field>
            </label>
            
            {showSubType && (
              <label
                htmlFor='subType'
                className={cx(
                  {
                    hidden: true
                  }
                )}>
                <Field
                  component='select'
                  name='subType'
                  id='subType'>
                  <option>All</option>
                  {nameSubTypeSearchOptions.map((option, i) => (
                    <option value={option.value} key={i}>{option.label}</option>
                  ))}
                </Field>
              </label>
            )}
          </div>
        </div>
      </fieldset>
    
    </Form>
  )
}


@connect(state => ({
  search: getSearch(state),
}), {
  apiFetchNameTypes,
  apiFetchNameSubTypes,
})
export default class SearchBox extends React.Component {
  render() {
    const { handleSearchClick } = this.props
    const { searchParams } = this.props.search
    
    return (
      <Formik
        initialValues={searchParams}
        render={InnerForm}
        onSubmit={handleSearchClick}
      />
    )
  }
}

SearchBox.propTypes = {
  handleSearchClick: PropTypes.func.isRequired,
}
