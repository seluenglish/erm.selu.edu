import ccLogo from 'assets/by-nc.png'
import { getShowFooter } from 'app/modules/general/general.selectors'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'

export class Footer extends React.Component {
  render() {
    const { showFooter } = this.props

    if (!showFooter) return null;

    return (
      <footer className='footer'>
        <div className='container'>
          <span className='text-muted'>
            The Early Ruskin Manuscripts, 1826–1842. &copy;&nbsp;David Hanson, &nbsp;
            <a href='mailto:david.hanson@selu.edu'>david.hanson@selu.edu</a> <br />
            <a href='https://creativecommons.org/licenses/by-nc/4.0/' target='_blank'>
              <img src={ccLogo} style={{ height: '2.5em', marginTop: 4 }} />
            </a>
          </span>
        </div>
      </footer>
    )
  }
}

const mapStateToProps = (state) => ({
  showFooter: getShowFooter(state),
})

export default hot(module)(connect(mapStateToProps, null, null, {
  pure: false,
})(Footer))
