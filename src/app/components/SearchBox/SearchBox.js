import {connect} from 'react-redux'
import cx from 'classnames'
import styles from './SearchBox.module.scss'
import PropTypes from 'prop-types'
import {FILE_TYPES} from 'helpers/document-helpers'
import {getSearch} from 'app/modules/search/search.selectors'
import {apiFetchDocTypes, apiFetchSubDocTypes, searchParamChange} from 'app/modules/search/search.actions'
import {Formik, Field, Form} from 'formik'

function itemName(item) {
  let ret = item.replace('_', ' ')
  return ret
}

const InnerForm = (props) => {
  const { fullTextChecked} = props.values
  const { handleSubmit} = props
  
  return (
    <Form className='SearchBox' style={styles}>
      <fieldset>
        <legend>Advanced Search</legend>
        <div className='searchFields'>
          <div className={'firstBox'}>
            <Field type='text' name='searchText' />
            <label htmlFor='fullTextChecked'>
              <Field
                type='checkbox'
                name='fullTextChecked'
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
              <Field component='select' name='searchIn'>
                {FILE_TYPES.map((type, i) => (
                  <option value={type} key={i}>{type}</option>
                ))}
              </Field>
            </label>
            
            <label htmlFor='docType'>
              Doc Type:
              <Field component='select' name='docType'>
                <option>A</option>
                <option>B</option>
              </Field>
            </label>
            
            <label
              htmlFor='subDocType'
              className={cx(
                {
                  hidden: true
                }
              )}>
              Subdoc type:
              <Field component='select' name='subDocType'>
                <option>A</option>
                <option>B</option>
              </Field>
            </label>
          </div>
        </div>
      </fieldset>
    
    </Form>
  )
}


@connect(state => ({
  search: getSearch(state)
}), {
  apiFetchDocTypes,
  apiFetchSubDocTypes,
  searchParamChange,
})
export default class SearchBox extends React.Component {
  render() {
    const {handleSearchClick} = this.props
    const {searchParams} = this.props.search
    
    return (
      <Formik
        initialValues={searchParams}
        render={InnerForm}
        onSubmit={handleSearchClick}
        searchText='batman'
      />
    )
  }
}

SearchBox.propTypes = {
  handleSearchClick: PropTypes.func.isRequired
}
