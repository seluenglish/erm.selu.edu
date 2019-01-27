import {connect} from 'react-redux'
import DocumentMeta from 'react-helmet'
import {hot} from 'react-hot-loader'
import {RUSKIN_BASE_URL} from 'config/constants'


@connect(null, {  })
class XmlRoute extends React.Component {

  render() {
    return (
      <section className='UpdateDbRoute'>
        <DocumentMeta>
          <title>XML&quot;s</title>
        </DocumentMeta>

        <iframe
          title={'XML Listing'}
          src={`${RUSKIN_BASE_URL}/xml`}
          style={{
            width: '100%',
            height: '36rem',
            border: 'none',
          }}
        />

      </section>
    )
  }
}

export default hot(module)(XmlRoute)

