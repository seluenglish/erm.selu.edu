import cx from 'classnames'
import styles from './UpdateDbForm.scss'
import PropTypes from 'prop-types'
import {Formik, Field, Form} from 'formik'
import {hot} from 'react-hot-loader'
import { getSearch } from 'app/modules/search/search.selectors'
import { connect } from 'react-redux'

const InnerForm = (props) => {
  return (<Form
    className='UpdateDbForm'
    style={styles}>
    <fieldset>
      <legend>Update Database</legend>
      <div className='searchFields'>
        <Field
          type='password'
          name='password'
          placeholder='Enter password...'
        />
        <button
          type='submit'
          className={cx(
            {
              btn: true,
            }
          )}>Update
        </button>
      </div>
    </fieldset>
  
  </Form>)
}

@connect(state => ({
  search: getSearch(state),
}), {
})
export class UpdateDbForm extends React.Component {
  render() {
    const { handleClick } = this.props
    return (
      <div className='UpdateDbForm no-print'>
        <Formik
          initialValues={{ password: 'batman' }}
          render={InnerForm}
          onSubmit={handleClick}
        />
      
        
      </div>
      
    )
  }
  
}

UpdateDbForm.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

export default hot(module)(UpdateDbForm)
