import { request } from 'app/utils'
import { SERVER_ROOT } from '../../../helpers/url-helper'

import { API_GET_PAGE } from './search-document.constants'

export const apiGetDocument = (url) => ({
  type: API_GET_PAGE,
  payload: {
    promise: request.fetch(`${SERVER_ROOT}${url}.html`),
  },
})
