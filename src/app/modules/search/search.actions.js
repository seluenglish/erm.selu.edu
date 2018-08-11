import { request } from 'app/utils'
import { API_FETCH_DOC_TYPES, API_FETCH_SUB_DOC_TYPES } from './search.constants'

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

