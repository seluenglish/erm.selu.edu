import { withRouter} from "react-router"
import ScrollManager from "./ScrollManager"

export const sessionStorageInterface = {
  get(key) {
    const val = window.sessionStorage.getItem(key)
    if(val === undefined) return val
    else return JSON.parse(val)
  },
  set(key, val) {
    const data = JSON.stringify(val)

    window.sessionStorage.setItem(key, data)
  }
}
export class ScrollManagerWrapper extends React.Component {
  render() {
    const {location} = this.props

    let {key, pathname, search, hash} = location
    if (!search) search = ''
    const scrollKey = `${pathname}${search}`

    return <ScrollManager
      scrollKey={scrollKey}
      hash={hash}
      scrollStore={sessionStorageInterface}/>
  }
}


export default withRouter(ScrollManagerWrapper)
