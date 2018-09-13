import { START_CONNECTION, ADD_MESSAGE, END_CONNECTION, UPDATE_LOGGER_DIV_ID } from './server-update-db.constants'

export const startConnection = (formData, outputDivId) => ({
  type: START_CONNECTION,
  meta: { server: true, next: true },
  payload: formData,
})

export const updateLoggerDivId = (outputDivId) => ({
  type: UPDATE_LOGGER_DIV_ID,
  data: outputDivId,
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

