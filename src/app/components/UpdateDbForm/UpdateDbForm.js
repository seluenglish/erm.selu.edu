import cx from 'classnames'
import styles from './UpdateDbForm.scss'
import PropTypes from 'prop-types'
import { Formik, Field, Form } from 'formik'
import { hot } from 'react-hot-loader'
import { getSearch } from 'app/modules/search/search.selectors'
import { connect } from 'react-redux'

const InnerForm = (form) => {
  const { showErrors, wordCount, updateSearchDb, showDebug } = form.values

  return (
    <Form
      className='UpdateDbForm'
      style={styles}>
      <fieldset>
        <legend>Admin Command Panel</legend>
        <div className='searchFields'>
          <Field
            type='password'
            name='password'
            placeholder='Enter password...'
          />
          <br />
          <label htmlFor='showErrors'>
            <Field
              type='checkbox'
              name='showErrors'
              id='showErrors'
              checked={showErrors}
              // onChange={null}
            />
            &nbsp;Show errors</label>
          <br />
          <label htmlFor='wordCount'>
            <Field
              type='checkbox'
              name='wordCount'
              id='wordCount'
              checked={wordCount}
              // onChange={void}
            />
            &nbsp;Word count</label>
          <br />
          <label htmlFor='showDebug'>
            <Field
              type='checkbox'
              name='showDebug'
              id='showDebug'
              checked={showDebug}
              // onChange={void}
            />
            &nbsp;Show Debug</label>
          <br />
          <label htmlFor='updateSearchDb'>
            <Field
              type='checkbox'
              name='updateSearchDb'
              id='updateSearchDb'
              checked={updateSearchDb}
              // onChange={void}
            />
            &nbsp;Update Search Database</label>
          <br />
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

    </Form>
  )
}

@connect(state => ({
  search: getSearch(state),
}), {
})
export class UpdateDbForm extends React.Component {
  render() {
    const { handleClick } = this.props
    const initialProps = {
      password: '',
      wordCount: true,
      showErrors: false,
      updateSearchDb: false,
      showDebug: false,
    }
    return (
      <div className='UpdateDbForm no-print'>
        <Formik
          initialValues={initialProps}
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
