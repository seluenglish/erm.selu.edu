import { connect } from 'react-redux'
import cx from 'classnames'
import styles from './SearchBox.module.scss'
import PropTypes from 'prop-types'
import { getFileTypeSearchOptions, getNameSubTypeSearchOptions, getNameTypeSearchOptions } from 'helpers/document-helpers'
import { getSearch, getSearchError } from 'app/modules/search/search.selectors'
import { apiFetchNameSubTypes, apiFetchNameTypes, updateSearchParams } from 'app/modules/search/search.actions'
import { Formik, Field, Form } from 'formik'
import update from 'immutability-helper'
import { hot } from 'react-hot-loader'

const InnerForm = (form) => {
  const { fullTextChecked } = form.values

  const fileTypeSearchOptions = getFileTypeSearchOptions()
  const nameTypeSearchOptions = getNameTypeSearchOptions()

  const nameType = form.values.type
  const nameSubTypeSearchOptions = (nameType && nameType !== 'all')?getNameSubTypeSearchOptions(nameType):undefined
  const showSubType = (nameSubTypeSearchOptions && nameSubTypeSearchOptions.length>0)

  const { customErrorMessage } = form

  let errorMsg = Object.values(form.errors)
  if (errorMsg.length) errorMsg = errorMsg[0]

  const textPlaceHolderGenerator = () => {
    if (fullTextChecked) {
      return 'Search for a word or a phrase...'
    }

    if (nameType === 'date') {
      return 'YYYYMMDD or YYYYMM or YYYY format'
    }

    if (showSubType && form.values.subType && form.values.subType !== 'all') {
      return `Search ${form.values.subType}`
    }

    if (nameType && nameType !== 'all') {
      return `Search ${nameType}`
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
    <Form
      className='d-print-none' style={styles}
      onSubmit={handleSubmit}>
      <fieldset>
        <legend>Advanced Search</legend>
        <div className='container-fluid'>
          <div className='row align-items-baseline'>

            <div className={'firstBox col-sm-4'}>


              <Field
                type='text'
                name='searchText'
                className='form-control'
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
                &nbsp;Search full text of documents</label>

              <div className={'error text-danger'} style={{ visibility: (errorMsg || customErrorMessage) ? 'visible' : 'hidden' }}>
                {errorMsg && errorMsg.length > 0 && errorMsg}
                {errorMsg && errorMsg.length > 0 && customErrorMessage && <br />}
                {customErrorMessage && customErrorMessage}
              </div>

            </div>
            <div className='secondBox col-sm-3'>
              <button
                type='submit'
                className='btn btn-secondary'>Search
              </button>
            </div>
            <div className='thirdBox col-sm-5'>
              <label htmlFor='searchIn'>
                Search in: &nbsp;
                <Field
                  className='form-control'
                  component='select'
                  name='searchIn'
                  id='searchIn'>
                  <option value='all'>All</option>

                  {fileTypeSearchOptions.map((option, i) => (
                    <option value={option.value} key={i}>{option.label}</option>
                  ))}
                </Field>
              </label>
              <br />

              <label htmlFor='type'>
                Of name type: &nbsp;
                <Field
                  className='form-control'
                  component='select'
                  name='type'
                  id='type'
                  onChange={handleNameTypeChange}
                  disabled={fullTextChecked}>
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
                    className='form-control'
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
        </div>
      </fieldset>

    </Form>
  )
}


@connect(state => ({
  search: getSearch(state),
  error: getSearchError(state),
}), {
  apiFetchNameTypes,
  apiFetchNameSubTypes,
  updateSearchParams,
})
export class SearchBox extends React.Component {
  constructor(props) {
    super(props)

    this.validate = this.validate.bind(this)
  }

  loadSearchParamsFromURL() {
    const queryString = this.props.queryString

    const parser = new URLSearchParams(queryString)

    const params = update(this.props.search.searchParams, {
      neverLoaded: { $set: false },
    })

    const text = parser.get('text')

    if (text) {
      params.searchText = text
    }

    this.props.updateSearchParams(params)

  }

  componentWillMount() {
    if (this.props.search && this.props.search.searchParams && this.props.search.searchParams.neverLoaded) {
      this.loadSearchParamsFromURL()
    }
  }

  validate(values) {
    const errors = {}

    if (!values.searchText) {
      errors.searchText = 'Search phrase required'
    } else if (values.searchText.length < 2) {
      errors.searchText = 'Enter at least 2 characters'
    }

    return errors
  }

  render() {
    const { handleSearchClick, error } = this.props
    const { searchParams } = this.props.search

    return (
      <Formik
        initialValues={searchParams}
        render={(formicProps) => <InnerForm {...formicProps} customErrorMessage={error} />}
        validate={this.validate}
        onSubmit={handleSearchClick}
      />
    )
  }
}

SearchBox.propTypes = {
  handleSearchClick: PropTypes.func.isRequired,
  queryString: PropTypes.string,
}

export default hot(module)(SearchBox)
