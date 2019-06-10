import {hot} from 'react-hot-loader'
import {connect} from 'react-redux'
import './loading.scss'
import {getIsPending } from 'app/modules/search-document/search-document.selectors'


@connect(state => ({
  isPending: getIsPending(state),
}))
export class LoadingComponent extends React.Component {
  render() {

    const { isPending } = this.props

    if (!isPending) return null;

    return (
      <div className='loading spinner-border' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    )
  }
}

export default hot(module)(LoadingComponent)
