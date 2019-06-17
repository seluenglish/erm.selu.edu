import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { flashReducers as flash } from 'app/modules/flash/flash.reducers'
import { searchReducers as search } from 'app/modules/search/search.reducers'
import { searchDocumentReducers as searchDocument } from 'app/modules/search-document/search-document.reducers'
import { serverUpdateDbReducers as serverUpdateDb } from 'app/modules/server-update-db/server-update-db.reducers'
import { generalReducers as general} from 'app/modules/general/general.reducers'
import { isBrowser } from 'app/utils'

let reducer
if(isBrowser)
  reducer = combineReducers({
    flash,
    routing,
    search,
    serverUpdateDb,
    searchDocument,
    general,
  })
else
  reducer = combineReducers({
    serverUpdateDb,
    searchDocument,
    search,
    general,
  })

export default reducer
