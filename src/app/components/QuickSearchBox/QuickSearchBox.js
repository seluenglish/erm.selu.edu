import { connect } from 'react-redux'
import cx from 'classnames'
import { getSearch } from 'app/modules/search/search.selectors'
import { updateSearchParams, apiSearch } from 'app/modules/search/search.actions'
import { Formik, Field, Form } from 'formik'
import { hot } from 'react-hot-loader'
import { getUrl } from 'helpers/url-helper'
import { Link } from 'react-router-dom'
import { replace } from 'react-router-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const InnerForm = () => {
  return (
    <Form className='form-inline my-lg-0' role='form'>

      <div className='searchbar'>
        <Field
          type='search'
          name='searchText'
          placeholder='Search...'
          className='form-control search_input'
          aria-label='Search'
        />
        <button className='search_icon' type='submit'>
          <FontAwesomeIcon icon='search' />
        </button>
      </div>

    </Form>
  )
}

@connect(state => ({
  search: getSearch(state),
}), { updateSearchParams, apiSearch, replace })
export class QuickSearchBox extends React.Component {
  constructor(props) {
    super(props)

    this.handleSearchClick = this.handleSearchClick.bind(this)
    this.handleAdvancedClick = this.handleAdvancedClick.bind(this)
  }
  handleSearchClick(params) {
    const { updateSearchParams, apiSearch, replace, onClick } = this.props

    updateSearchParams(params)
    apiSearch(params)
    replace('/search')

    if (onClick) onClick()
  }

  handleAdvancedClick(e) {
    e.preventDefault()

    const { replace, onClick } = this.props

    replace('/search')
    if (onClick) onClick(e)
  }

  render() {
    if (!this.props.search) return <div>Error</div>

    const { searchParams } = this.props.search

    return (
      <div className='QuickSearchBox'>
        <Formik
          initialValues={searchParams}
          render={InnerForm}
          onSubmit={this.handleSearchClick}
        />



        <div className='advancedSearchHolder'>
          <a
            href=''
            className='advancedSearch'
            onClick={this.handleAdvancedClick}>
            Advanced Search</a>
        </div>

      </div>
    )
  }
}

QuickSearchBox.propTypes = {
  onClick: PropTypes.func,
}

export default hot(module)(QuickSearchBox)
