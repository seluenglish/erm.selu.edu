import { PENDING, REJECTED, FULFILLED } from 'redux-promise-middleware'
import { typeToReducer, get } from 'app/utils'
import {
  API_GET_PAGE,
} from './search-document.constants'
import update from 'immutability-helper'


const parseData = (data) => {
  const doc = new DOMParser().parseFromString(data, 'text/xml')

  console.log({doc})

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

const pendingReducer = (state) => ({
  ...state,
  isPending: true,
  error: false,
})

export const searchDocumentReducers = typeToReducer({
  [API_GET_PAGE]: {
    [PENDING]: pendingReducer,
    [REJECTED]: rejectedReducer,
    [FULFILLED]: (state, action) => {
      const meta = parseData(get('payload')(action))
      console.log('meta is', meta)
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
