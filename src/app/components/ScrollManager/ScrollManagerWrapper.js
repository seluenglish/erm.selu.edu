import { withRouter} from "react-router"
import ScrollPositionManager from "./ScrollManager"

export const localStorageInterface = {
  get(key) {
    const val = window.localStorage.getItem(key)
    if(val === undefined) return
    else return JSON.parse(val)
  },
  set(key, val) {
    const data = JSON.stringify(val)

    window.localStorage.setItem(key, data)
  }
}
export class ScrollManagerWrapper extends React.Component {
  render() {
    const {location} = this.props

    let {key, pathname, search, hash} = location
    if (!search) search = ''
    if (!hash) hash='#'
    const scrollKey = `${pathname}${search}${hash}`

    return <ScrollPositionManager
      scrollKey={scrollKey}
      scrollStore={localStorageInterface}/>
  }
}


export default withRouter(ScrollManagerWrapper)
