import {API_GET_PAGE} from 'app/modules/search-document/search-document.constants'
import {SERVER_HTML_DIRECTORY} from 'config/constants'
import { FULFILLED, REJECTED } from 'redux-promise-middleware'
import { request } from 'app/utils'

const log = debug('set-document')

const mapUrl = (request) => {
  let path = '/'
  if (request === '/') {
    path = '/webpages/homepage.html'
  } else {
    path = `${request}.html`
  }
  return `${SERVER_HTML_DIRECTORY}${path}`

}
export default async function setDocument(ctx, next) {
  log('setting document')
  const path = ctx.request.originalUrl

  const url = mapUrl(path)

  // console.log('url is ', url)
  try {
    const fileContents = await (await request.fetch(url)).text()

    ctx.store.dispatch({
      type: `${API_GET_PAGE}_${FULFILLED}`,
      payload: fileContents,
    })
  } catch (e) {
    // console.log('could not download file. Not setting the store.')
    // console.log(e)

    ctx.store.dispatch({
      type: `${API_GET_PAGE}_${REJECTED}`,
    })
  }

  await next()
}
