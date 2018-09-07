import { PENDING, REJECTED, FULFILLED } from 'redux-promise-middleware'
import { isBrowser, typeToReducer, get } from 'app/utils'
import { END_CONNECTION, ADD_MESSAGE, SET_CLIENT_ID } from './server-update-db.constants'

const getClientId = get('meta.client')

const initialState = {
  data: {
    clientId: undefined,
  },
}

const error = () => {
  throw new Error('Add message action can not be dispatched to server itself.')
}


export const serverUpdateDbReducers = typeToReducer({
  [SET_CLIENT_ID]: (state, action) => {
    console.log('setting client id', state, action, isBrowser)
    return {
      ...state,
      data: {
        ...state.data,
        clientId: getClientId(action),
      },
    }
  },
  [ADD_MESSAGE]: error,
  [END_CONNECTION]: (state) => ({
    ...state,
    data: {
      ...state.data,
      clientId: undefined
    },
  }),
  
}, initialState)
