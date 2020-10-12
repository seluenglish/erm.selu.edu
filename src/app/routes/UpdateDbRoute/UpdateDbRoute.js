import { connect } from 'react-redux'
import DocumentMeta from 'react-helmet'
import { hot } from 'react-hot-loader'
import UpdateDbForm from 'app/components/UpdateDbForm/UpdateDbForm'
import { request } from 'app/utils'
import { startConnection, updateLoggerDivId } from 'app/modules/server-update-db/server-update-db.actions'

@connect(null, { startConnection, updateLoggerDivId })
class UpdateDbRoute extends React.Component {
  constructor(props) {
    super(props)

    this.gotPasswordFromUser = this.gotPasswordFromUser.bind(this)

    this.loggerRef = React.createRef()

  }

  gotPasswordFromUser(formData) {
    // console.log('authenticating')
    this.props.updateLoggerDivId(this.loggerRef)
    this.props.startConnection(formData)
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

        <h1>Log</h1>
        <div ref={this.loggerRef} className='logs-holder' >
          <div>Check at least one box and then click update.</div>
        </div>

      </section>
    )
  }
}

export default hot(module)(UpdateDbRoute)

