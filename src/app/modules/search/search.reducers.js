import { PENDING, REJECTED, FULFILLED } from 'redux-promise-middleware'
import { typeToReducer, get, isBrowser } from 'app/utils'
import {
  API_FETCH_NAME_TYPES,
  API_FETCH_NAME_SUB_TYPES,
  API_SEARCH,
  UPDATE_SEARCH_PARAMS,
  ADD_DB_UPDATE_MESSAGE,
  SHOW_HIDE_SEARCH_ITEM_ALL_MATCHES,
} from './search.constants'
import update from 'immutability-helper'

const getNameTypes = get('payload')
const getNameSubTypes = get('payload')
const getSearchResults = get('payload')
const getSearchParams = get('data')

const initialState = {
  isPending: false,
  error: false,
  data: {
    searchParams: {
      searchText: 'calais',
      fullTextChecked: false,
      
      searchIn: 'all',
      
      type: '',
      subType: '',
    },
    
    searchResults: null,
    
    dbUpdateMessages: [],
  },
}


const rejectedReducer = (state, action) => ({
  ...state,
  error: action.payload
})

const pendingReducer = (state) => ({
  ...state,
  isPending: true
})

export const searchReducers = typeToReducer({
  [API_FETCH_NAME_TYPES]: {
    [PENDING]: pendingReducer,
    [REJECTED]: rejectedReducer,
    [FULFILLED]: (state, action) => ({
      ...state,
      data: {
        ...state.data,
        docTypes: getNameTypes(action),
      },
    }),
  },
  [API_FETCH_NAME_SUB_TYPES]: {
    [PENDING]: pendingReducer,
    [REJECTED]: rejectedReducer,
    [FULFILLED]: (state, action) => ({
      ...state,
      data: {
        ...state.data,
        subDocTypes: getNameSubTypes(action),
      },
    }),
  },
  [API_SEARCH]: {
    [PENDING]: pendingReducer,
    [REJECTED]: rejectedReducer,
    [FULFILLED]: (state, action) => ({
      ...state,
      data: {
        ...state.data,
        searchResults: getSearchResults(action),
      },
      
    }),
  },
  [UPDATE_SEARCH_PARAMS]: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      searchParams: getSearchParams(action),
    },
  }),
  
  [SHOW_HIDE_SEARCH_ITEM_ALL_MATCHES]: (state, action) => {
    
    if (!state.data.searchResults) return state
    
    const { documentId, newToggleState } = action.payload
    
    const documentIndex = state.data.searchResults.listItems.findIndex(x => x.id === documentId)
    
    return update(state, {
      data: {
        searchResults: {
          listItems: {
            [documentIndex]: {
              showingAllMatches: { $set: newToggleState },
            },
          },
        },
      },
    })
  },
  
}, initialState)
