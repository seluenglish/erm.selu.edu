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

const InnerForm = () => {
  return (
    <Form className='QuickSearchBox form-inline my-2 my-lg-0'>
      <Field
        type='search'
        name='searchText'
        placeholder='Search...'
        className='form-control mr-sm-2'
        aria-label='Search'
      />
      <button
        type='submit'
        className='btn btn-outline-light my-2 my-sm-0'>
        Search
      </button>
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
  }
  handleSearchClick(params) {
    const { updateSearchParams, apiSearch, replace, onClick } = this.props

    updateSearchParams(params)
    apiSearch(params)
    replace('/search')

    if (onClick) onClick()
  }

  render() {
    if (!this.props.search) return <div>Error</div>

    const { searchParams } = this.props.search

    const { onClick } = this.props

    return (
      <div className='QuickSearchBox'>
        <Formik
          initialValues={searchParams}
          render={InnerForm}
          onSubmit={this.handleSearchClick}
        />
        <div className='advancedSearchBox'>
          <Link
            to='/search'
            onClick={onClick}
          >
          Advanced Search</Link>
        </div>
      </div>
    )
  }
}

QuickSearchBox.propTypes = {
  onClick: PropTypes.func,
}

export default hot(module)(QuickSearchBox)
