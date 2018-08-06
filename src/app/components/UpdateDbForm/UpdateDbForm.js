import cx from 'classnames'
import styles from './UpdateDbForm.scss'
import PropTypes from 'prop-types'

export default class UpdateDbForm extends React.Component {
  constructor(...args) {
    super(...args)
    
    this.state = {
      password: '',
    }
    
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  
  handleFormSubmit() {
    const { handleClick } = this.props
    const { password } = this.state
    
    return handleClick(password)
  }
  
  handlePasswordChange({ target }) {
    this.setState({
      password: target.value,
    })
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
              id={'password'}
              value={password}
              onChange={this.handlePasswordChange}
              placeholder={'Enter password...'}
            />
            <button
              type='button'
              onClick={this.handleFormSubmit}
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
