import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { searchReducers as search } from 'app/modules/search/search.reducers'
import { searchDocumentReducers as searchDocument } from 'app/modules/search-document/search-document.reducers'
import { serverUpdateDbReducers as serverUpdateDb } from 'app/modules/server-update-db/server-update-db.reducers'
import { generalReducers as general } from 'app/modules/general/general.reducers'
import { isBrowser } from 'app/utils'
import {isAuth} from '../../reducer/authenticationReducer'

let reducer
if(isBrowser)
  reducer = combineReducers({
    routing,
    search,
    serverUpdateDb,
    searchDocument,
    general,
    isAuth
  })
else
  reducer = combineReducers({
    serverUpdateDb,
    searchDocument,
    search,
    general,

  })

export default reducer
