import { PENDING, REJECTED, FULFILLED } from 'redux-promise-middleware'
import { typeToReducer, get, isBrowser } from 'app/utils'
import {
  API_GET_PAGE,
} from './search-document.constants'
import update from 'immutability-helper'


const parseData = (data) => {
  let domParser
  if (isBrowser) {
    domParser = new window.DOMParser()
  } else {
    domParser = new (require('xmldom').DOMParser)()
  }
  const doc = domParser.parseFromString(data, 'text/html')

  let result
  if (isBrowser) {
    result = {
      body: doc.getElementById('mainBody').innerHTML,
      title: doc.getElementById('mainTitle').innerText,
    }

  }else {
    result = {
      body: doc.getElementById('mainBody').toString(),
      title: doc.getElementById('mainTitle').textContent,
    }

  }
  // const result = {
  //   body: R.prop('innerHTML', doc.getElementById('mainBody')),
  //   title: R.prop('innerHTML', doc.getElementById('mainTitle')),
  // }
  // console.log(doc.toString())
  // console.log(result)

  return result
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
