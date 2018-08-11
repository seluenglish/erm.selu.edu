import { request } from 'app/utils'
import { API_FETCH_DOC_TYPES, API_FETCH_SUB_DOC_TYPES, API_UPDATE_DB_AUTENTICATE } from './search.constants'

export const apiFetchDocTypes = () => ({
  type: API_FETCH_DOC_TYPES,
  payload: {
    promise: request.fetch('/api/docTypes'),
  },
})

export const apiFetchSubDocTypes = () => ({
  type: API_FETCH_SUB_DOC_TYPES,
  payload: {
    promise: request.fetch('/api/subDocTypes'),
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
