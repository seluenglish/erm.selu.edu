import {connect} from 'react-redux'
import DocumentMeta from 'react-helmet'
import {hot} from 'react-hot-loader'
import UpdateDbForm from 'app/components/UpdateDbForm/UpdateDbForm'
import {request} from 'app/utils'
import {apiUpdateDbAuthenticate} from 'app/modules/search/search.actions'
import { addMessage } from 'app/modules/flash/flash.actions'
import ResponseError from 'helpers/response-error'

@connect(null, { addMessage, apiUpdateDbAuthenticate })
class UpdateDbRoute extends React.Component {
  constructor(props) {
    super(props)
    
    this.gotPasswordFromUser = this.gotPasswordFromUser.bind(this)
  }
  
  loginComplete(data){
    console.log('login complete', data)
    
    
  }
  
  gotPasswordFromUserSocket(data) {
    console.log('sending')
    const server = require('../../composition/socket').default
    server.emit('data', 'cat')
    console.log('sent')
  
  }
  
  gotPasswordFromUser(formData) {
    console.log('authenticating')
    this.props.apiUpdateDbAuthenticate(formData)
  }
  gotPasswordFromUser1(formData) {
    this.handle = apiUpdateDbAuthenticate(formData)
    const payload = this.handle.payload
    const { addMessage } = this.props
    
    payload.promise = payload.promise
      .then((data) => {
        return this.loginComplete(data)
      }).catch((error) => {
        if (!(error instanceof ResponseError)) {
          throw error
        }
        
        console.log('error', error.status, error.json)
        
        if(error.json)
          addMessage(`${error.status}: ${error.json.message}`)
        else
          addMessage(`Error ${error.status}`)
      })
      .catch((error) => {
        console.log('final', error)
        addMessage('Unknown error occured. Try again')
      })
    
    return false
  }
  
  render() {
    return (
      <section className='UpdateDbRoute'>
        <DocumentMeta>
          <title />
        </DocumentMeta>
        
        <UpdateDbForm
          handleClick={this.gotPasswordFromUser}
        />
      
      </section>
    )
  }
}

export default hot(module)(UpdateDbRoute)

