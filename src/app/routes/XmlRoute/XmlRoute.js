import {connect} from 'react-redux'
import DocumentMeta from 'react-helmet'
import {hot} from 'react-hot-loader'
import {SERVER_XML_DIRECTORY} from 'config/constants'


@connect(null, {  })
class XmlRoute extends React.Component {

  render() {
    return (
      <section className='UpdateDbRoute container-fluid'>
        <DocumentMeta>
          <title>XML</title>
        </DocumentMeta>

        <iframe
          title={'XML Listing'}
          src={SERVER_XML_DIRECTORY}
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

