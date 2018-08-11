import 'isomorphic-fetch'
import debug from 'debug'
import ResponseError from 'helpers/response-error'

const log = debug('utils.request')

export const fetch = async (endpoint, options) => {
  log('requesting', endpoint)
  const response = await (global || window).fetch(endpoint, options)
  log('response', { endpoint, status: response.status })

  if (response.status >= 400) {
    const json = await response.json()
    throw new ResponseError(response, json, endpoint)
  }

  if (response.headers.has('content-length')
    && Number(response.headers.get('content-length')) <= 0) {
    return null
  }

  const contentType = response.headers.get('content-type')

  return ~contentType.indexOf('application/json')
    ? response.json()
    : response.text()
}
