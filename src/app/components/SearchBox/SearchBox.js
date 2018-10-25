import { connect } from 'react-redux'
import cx from 'classnames'
import styles from './SearchBox.module.scss'
import PropTypes from 'prop-types'
import { getFileTypeSearchOptions, getNameSubTypeSearchOptions, getNameTypeSearchOptions } from 'helpers/document-helpers'
import { getSearch } from 'app/modules/search/search.selectors'
import { apiFetchNameSubTypes, apiFetchNameTypes} from 'app/modules/search/search.actions'
import { Formik, Field, Form } from 'formik'

const InnerForm = (form) => {
  const { fullTextChecked } = form.values

  const fileTypeSearchOptions = getFileTypeSearchOptions()
  const nameTypeSearchOptions = getNameTypeSearchOptions()

  const nameType = form.values.type
  const nameSubTypeSearchOptions = (nameType && nameType !== 'all')?getNameSubTypeSearchOptions(nameType):undefined
  const showSubType = (nameSubTypeSearchOptions && nameSubTypeSearchOptions.length>0)

  let error = Object.values(form.errors)
  if (error.length) error = error[0]

  const textPlaceHolderGenerator = () => {
    if (fullTextChecked) {
      return 'Search for a phrase...'
    }

    if (nameType === 'date') {
      return 'Search for a date in MMDDYYYY format...'
    }

    if (showSubType && form.values.subType && form.values.subType !== 'all') {
      return `Search for a ${form.values.subType}`
    }

    if (nameType && nameType !== 'all') {
      return `Search for a ${nameType}`
    }

    return `Search for a keyword...`
  }

  const textPlaceHolder = textPlaceHolderGenerator()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (Object.keys(form.errors).length) {
      return false
    } else {
      return form.handleSubmit()
    }
  }

  const handleNameTypeChange = (e) => {
    console.log('name type change')

    form.handleChange(e)

    return true
  }

  const handleFullTextCheckedStatusChange = (e) => {
    const oldStatus = form.values.fullTextChecked
    const newStatus = !oldStatus

    if (newStatus) {
      form.setFieldValue('type', '')
      form.setFieldValue('subType', '')
    }

    form.handleChange(e)
  }

  return (
    <Form className='SearchBox' style={styles} onSubmit={handleSubmit}>
      <fieldset>
        <legend>Advanced Search</legend>
        <div className='searchFields'>
          <div className={'firstBox'}>
            <div className={'error'} style={{ visibility: error?'visible':'hidden' }}>
              {error}&nbsp;
            </div>


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
                onChange={handleFullTextCheckedStatusChange}
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
                id='type'
                onChange={handleNameTypeChange}
              >
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
                    hidden: true,
                  }
                )}>
                <Field
                  component='select'
                  name='subType'
                  id='subType'>
                  <option value='all'>All</option>
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
  constructor(props){
    super(props)

    this.validate = this.validate.bind(this)
  }

  validate(values) {
    const errors = {}

    if (!values.searchText) {
      errors.searchText = 'Search phrase required'
    }else if(values.searchText.length < 2) {
      errors.searchText = 'Enter at least 2 characters'
    }

    return errors
  }

  render() {
    const { handleSearchClick } = this.props
    const { searchParams } = this.props.search

    return (
      <Formik
        initialValues={searchParams}
        render={InnerForm}
        validate={this.validate}
        onSubmit={handleSearchClick}
      />
    )
  }
}

SearchBox.propTypes = {
  handleSearchClick: PropTypes.func.isRequired,
}
