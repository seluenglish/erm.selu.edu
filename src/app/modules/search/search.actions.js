import { request } from 'app/utils'
import { API_FETCH_NAME_SUB_TYPES, API_FETCH_NAME_TYPES, API_UPDATE_DB_AUTENTICATE } from './search.constants'

export const apiFetchNameTypes = () => ({
  type: API_FETCH_NAME_TYPES,
  payload: {
    promise: request.fetch('/api/nameTypes'),
  },
})

export const apiFetchNameSubTypes = () => ({
  type: API_FETCH_NAME_SUB_TYPES,
  payload: {
    promise: request.fetch('/api/nameSubTypes'),
  },
})

export const apiUpdateDbAuthenticate = (formData) => ({
  type: API_UPDATE_DB_AUTENTICATE,
  payload: {
    promise: request.fetch('/api/update_db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }),
  },
})
