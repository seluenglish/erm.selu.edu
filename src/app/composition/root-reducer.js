import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { flashReducers as flash } from 'app/modules/flash/flash.reducers'
import { barReducers as bar } from 'app/modules/bar/bar.reducers'
import { searchReducers as search } from 'app/modules/search/search.reducers'
import { serverUpdateDbReducers as serverUpdateDb } from 'app/modules/server-update-db/server-update-db.reducers'
import { isBrowser } from 'app/utils'

/** todo move searchReducers to server-only **/

if(isBrowser)
  console.log('isbrowser: ')

let reducer
if(isBrowser)
  reducer = combineReducers({
    flash,
    bar,
    routing,
    search,
    serverUpdateDb,
  })
else
  reducer = combineReducers({
    serverUpdateDb,
    search,
  })

export default reducer
