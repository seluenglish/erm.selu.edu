import cx from 'classnames'
import styles from './UpdateDbForm.scss'
import PropTypes from 'prop-types'
import {Formik, Field, Form} from 'formik'

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
export default class UpdateDbForm extends React.Component {
  render() {
    const {handleClick} = this.props
    return (
      <Formik
        initialValues={{password: ''}}
        render={InnerForm}
        onSubmit={handleClick}
      />
    )
  }
  
}

UpdateDbForm.propTypes = {
  handleClick: PropTypes.func.isRequired,
}
