import { SET_CLIENT_ID, ADD_MESSAGE, END_CONNECTION} from './server-update-db.constants'

export const setClientId = (clientId) => ({
  type: SET_CLIENT_ID,
  payload: {
    clientId,
  },
})

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: {
    message,
  },
})

export const endConnection = () => ({
  type: END_CONNECTION,
})

