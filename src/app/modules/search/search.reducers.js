import { PENDING, REJECTED, FULFILLED } from 'redux-promise-middleware'
import { typeToReducer, get } from 'app/utils'
import { API_FETCH_SUB_DOC_TYPES, API_FETCH_DOC_TYPES, API_UPDATE_DB_AUTENTICATE } from './search.constants'
import Document from 'models/document'

const getDocTypes = get('payload')
const getSubDocTypes = get('payload')

const initialState = {
  isPending: false,
  error: false,
  data: {
    docTypes: [ 'docs' ],
    subDocTypes: [ 'subdocs' ],
  
    searchParams: {
      searchText: 'st',
      fullTextChecked: true,
      searchIn: '',
      docType: 'b',
      subDocType: 'b',
    },
    
    searchItems: [
      new Document,
      new Document,
    ],
    
  },
}

initialState.data.searchItems[0].title = '"Cadenabbia" [poem]'
initialState.data.searchItems[0].docType = 'poem'
initialState.data.searchItems[0].subDocType = 'Fiction'
initialState.data.searchItems[0].text = '"...Cadenabbia Oh love coolly came on Comos lake The lovely beams of morning mild, That oer the Lecco mountains break, And red their summits piled,1420 That high above their dim shore, Their weary winter garments bore, The broad boat lay along the tide The ligh..."'

initialState.data.searchItems[1].title = '[EVENING AT CHAMOUNI]'
initialState.data.searchItems[1].docType = 'poem'
initialState.data.searchItems[1].subDocType = 'non-fiction'
initialState.data.searchItems[1].text = '"...[EVENING AT CHAMOUNI] NOT such the night whose stormy might Heroic Balmat braved, When, darkening on the Goûtéʼs height, The tempest howled and raved. Upon the mighty hill, forlorn, He stood alone amid the storm; Watching the last day gleams decay, Sup..."'

const rejectedReducer = (state, action) => ({
  ...state,
  error: action.payload,
})

const pendingReducer = (state) => ({
  ...state,
  isPending: true,
})

export const searchReducers = typeToReducer({
  [API_FETCH_DOC_TYPES]: {
    [PENDING]: pendingReducer,
    [REJECTED]: rejectedReducer,
    [FULFILLED]: (state, action) => ({
      ...state,
      data: {
        ...state.data,
        docTypes: getDocTypes(action),
      },
    }),
  },
  [API_FETCH_SUB_DOC_TYPES]: {
    [PENDING]: pendingReducer,
    [REJECTED]: rejectedReducer,
    [FULFILLED]: (state, action) => ({
      ...state,
      data: { ...state.data,
        subDocTypes: getSubDocTypes(action),
      },
    }),
  },
  
}, initialState)
