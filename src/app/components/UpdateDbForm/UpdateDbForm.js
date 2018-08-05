import cx from 'classnames'
import styles from './UpdateDbForm.scss'
import PropTypes from 'prop-types'

export default class UpdateDbForm extends React.Component {
  constructor(...args) {
    super(...args)
    
    this.state = {
      password: '',
    }
  }
  
  formSubmit() {
    const { handleClick } = this.props
    const { password } = this.state
    
    return handleClick(password)
  }
  
  render() {
    const { password } = this.state
    return (
      <form
        className='UpdateDbForm'
        style={styles}>
        <fieldset>
          <legend>Update Database</legend>
          <div className='searchFields'>
            <input
              type={'password'}
              name={'password'}
              id={'searchText'}
              value={password}
              onChange={(evt) => this.setState({ password: evt.target.value })}
              placeholder={'Enter password...'}
            />
            <button
              type='button'
              onClick={this.formSubmit.bind(this)}
              className={cx(
                {
                  btn: true,
                }
              )}>Update
            </button>
          </div>
        </fieldset>
      
      </form>
    )
  }
}

UpdateDbForm.propTypes = {
  handleClick: PropTypes.func.isRequired,
}
