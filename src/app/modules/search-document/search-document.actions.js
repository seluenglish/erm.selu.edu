import { request } from 'app/utils'
import { SERVER_HTML_DIRECTORY } from 'config/constants'

import { API_GET_PAGE } from './search-document.constants'
import { isWitnessPath } from 'helpers/showcase-helper'

export const apiGetDocument = (url) => {
  if (isWitnessPath(url)) {

    return null;
  }
  return {
    type: API_GET_PAGE,
    payload: {
      promise: request.fetch(`${SERVER_HTML_DIRECTORY}${url}.html`),
    },
  }
}

