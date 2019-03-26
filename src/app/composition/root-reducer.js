import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { flashReducers as flash } from 'app/modules/flash/flash.reducers'
import { barReducers as bar } from 'app/modules/bar/bar.reducers'
import { searchReducers as search } from 'app/modules/search/search.reducers'
import { pageUtilsReducers as pageUtils } from 'app/modules/page-utils/page-utils.reducers'
import { searchDocumentReducers as searchDocument } from 'app/modules/search-document/search-document.reducers'
import { serverUpdateDbReducers as serverUpdateDb } from 'app/modules/server-update-db/server-update-db.reducers'
import { isBrowser } from 'app/utils'

/** todo move searchReducers to server-only **/

// if(isBrowser)
  // console.log('is browser')

let reducer
if(isBrowser)
  reducer = combineReducers({
    flash,
    bar,
    routing,
    search,
    serverUpdateDb,
    searchDocument,
    pageUtils,
  })
else
  reducer = combineReducers({
    serverUpdateDb,
    search,
  })

export default reducer
