import { request } from 'app/utils'
import {
  API_FETCH_NAME_SUB_TYPES,
  API_FETCH_NAME_TYPES,
  API_UPDATE_DB_AUTENTICATE,
  API_SEARCH,
  UPDATE_SEARCH_PARAMS,
  SHOW_HIDE_SEARCH_ITEM_ALL_MATCHES,
} from './search.constants'
import { START_CONNECTION } from 'app/modules/server-update-db/server-update-db.constants'
import ReactGA from 'react-ga'

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

export const apiUpdateDbAuthenticate1 = (formData) => ({
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

export const apiUpdateDbAuthenticate = (formData) => ({
  type: START_CONNECTION,
  meta: { server: true, next: true },
  payload: formData,
})

export const apiSearch = (formData) => {
  ReactGA.event({
    category: 'search',
    action: API_SEARCH,
    label: JSON.stringify(formData),
  })

  return {
    type: API_SEARCH,
    payload: {
      promise: request.fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }),
    },
  }
}

export const updateSearchParams = (formData) => ({
  type: UPDATE_SEARCH_PARAMS,
  data: formData,
})

export const showHideSearchItemAllMatches = (documentId, newToggleState) => ({
  type: SHOW_HIDE_SEARCH_ITEM_ALL_MATCHES,
  payload: {
    documentId,
    newToggleState,
  },
})
