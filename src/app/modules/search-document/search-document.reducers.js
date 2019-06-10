import { PENDING, REJECTED, FULFILLED } from 'redux-promise-middleware'
import { typeToReducer, get } from 'app/utils'
import {
  API_GET_PAGE,
} from './search-document.constants'
import update from 'immutability-helper'


const parseData = (data) => {
  const doc = new DOMParser().parseFromString(data, 'text/html')

  return {
    body: doc.querySelector('#mainBody').innerHTML,
    title: doc.querySelector('#mainTitle').innerHTML,
  }
}

const initialState = {
  isPending: false,
  error: false,
  data: {
    body: null,
  },
}

const rejectedReducer = (state, action) => {
  return {
    ...state,
    error: true,
    isPending: false,
  }
}

export const searchDocumentReducers = typeToReducer({
  [API_GET_PAGE]: {
    [PENDING]: (state) => {
      return update(state, {
        isPending: {$set: true},
        error: {$set: false},
        data: {
          body: {$set: null},
        },
      })
    },
    [REJECTED]: rejectedReducer,
    [FULFILLED]: (state, action) => {
      const meta = parseData(get('payload')(action))
      return ({
        ...state,
        error: false,
        isPending: false,
        data: {
          ...state.data,
          body: { __html: meta.body },
          title: meta.title,
        },
      })
    },
  },
}, initialState)
