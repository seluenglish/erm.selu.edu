import { hot } from 'react-hot-loader'
import UpdateDbForm from 'app/components/UpdateDbForm/UpdateDbForm'

class UpdateDbRoute extends React.Component {
  gotPasswordFromUser(password) {
    console.log('got password from user:', password)
  }
  
  render() {
    return (
      <section className='UpdateDbRoute'>
        
        <UpdateDbForm
          handleClick={this.gotPasswordFromUser.bind(this)}
        />
      
      </section>
    )
  }
}

export default hot(module)(UpdateDbRoute)

