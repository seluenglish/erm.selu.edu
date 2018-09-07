import { connect } from 'react-redux'
import cx from 'classnames'
import styles from './QuickSearchBox.module.scss'
import { getSearch } from 'app/modules/search/search.selectors'
import { updateSearchParams, apiSearch } from 'app/modules/search/search.actions'
import { Formik, Field, Form } from 'formik'
import { hot } from 'react-hot-loader'
import { getUrl } from 'helpers/url-helper'
import { Link } from 'react-router-dom'
import { replace } from 'react-router-redux'

const InnerForm = () => {
  return (
    <Form className='QuickSearchBox' style={styles}>
      <Field
        type='text'
        name='searchText'
        placeholder='Search...'
      />
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
}), { updateSearchParams, apiSearch, replace })
export class QuickSearchBox extends React.Component {
  constructor(props) {
    super(props)
    
    this.handleSearchClick = this.handleSearchClick.bind(this)
  }
  handleSearchClick(params) {
    const { updateSearchParams, apiSearch, replace } = this.props
    updateSearchParams(params)
    apiSearch()
    replace('/search')
  }
  
  render() {
    if(!this.props.search) return <div>Error</div>
    
    const { searchParams } = this.props.search
    
    return (
      <div className='QuickSearchBox'>
        {/*<Formik*/}
          {/*initialValues={searchParams}*/}
          {/*render={InnerForm}*/}
          {/*onSubmit={this.handleSearchClick}*/}
        {/*/>*/}
        <div className='advancedSearchBox'>
          <Link to='/search' >Advanced Search</Link>
        </div>
      </div>
    )
  }
}

export default hot(module)(QuickSearchBox)
