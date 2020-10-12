import { API_GET_PAGE } from 'app/modules/search-document/search-document.constants'
import { SERVER_HTML_DIRECTORY, SERVER_SHOWCASE_DIRECTORY } from 'config/constants'
import { FULFILLED, REJECTED } from 'redux-promise-middleware'
import { request } from 'app/utils'
import { isWitnessPath } from 'helpers/showcase-helper'
import { hideNavbar } from 'app/modules/general/general.actions'

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
  const path = ctx.request.originalUrl

  if (isWitnessPath(path)) {
    ctx.status = 302
    ctx.redirect(`${SERVER_SHOWCASE_DIRECTORY}${path}.php`)
  } else {
    const url = mapUrl(path)

    const shouldHideNavbar = path.indexOf('show_navbar=0') > -1
    if (shouldHideNavbar) {
      ctx.store.dispatch(hideNavbar())
    }

    log(`setting document for ${path}: ${url}`)

    try {
      const fileContents = await request.fetch(url)

      ctx.store.dispatch({ /* TODO change delimiter */
        type: `${API_GET_PAGE}_${FULFILLED}`,
        payload: fileContents,
      })
    } catch (e) {
      log('could not download file. Not setting the store.')
      log(e)

      ctx.status = 404

      ctx.store.dispatch({
        type: `${API_GET_PAGE}_${REJECTED}`,
      })
    }

    await next()
  }


}
