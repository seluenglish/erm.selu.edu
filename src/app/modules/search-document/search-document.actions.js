import { request } from 'app/utils'
import { SERVER_HTML_DIRECTORY } from 'config/constants'

import { API_GET_PAGE } from './search-document.constants'

export const apiGetDocument = (url) => ({
  type: API_GET_PAGE,
  payload: {
    promise: request.fetch(`${SERVER_HTML_DIRECTORY}${url}.html`),
  },
})
