import { connect } from 'react-redux'
import cx from 'classnames'
import styles from './QuickSearchBox.module.scss'
import PropTypes from 'prop-types'
import { getSearch } from 'app/modules/search/search.selectors'
import { Formik, Field, Form } from 'formik'
import { hot } from 'react-hot-loader'
import { getUrl } from "helpers/url-helper"
import { Link } from 'react-router-dom'

const InnerForm = () => {
  return (
    <Form className='QuickSearchBox' style={styles}>
      <Field type='text' name='searchText' />
      <button
        type='submit'
        className={cx(
          {
            btn: true,
          }
        )}>Go
      </button>
    </Form>
  )
}

@connect(state => ({
  search: getSearch(state),
}), {})
export class QuickSearchBox extends React.Component {
  render() {
    const { handleSearchClick } = this.props
    const { searchParams } = this.props.search
    const advancedSearchUrl = getUrl('search')
    // const searchParams = { searchText: '' }
    
    return (
      <div className='QuickSearchBox'>
        <Formik
          initialValues={searchParams}
          render={InnerForm}
          onSubmit={handleSearchClick}
        />
        <div className='advancedSearchBox'>
          <Link to='/search' >Advanced Search</Link>
        </div>
      </div>
    )
  }
}

QuickSearchBox.propTypes = {
  handleSearchClick: PropTypes.func.isRequired
}

export default hot(module)(QuickSearchBox)
