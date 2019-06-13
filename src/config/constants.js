import { isBrowser } from 'app/utils'

export const CONTAINER_ELEMENT_ID = 'app-container'

export const SERVER_ROOT = process.env.NODE_ENV === 'production'
  ?'https://erm.selu.edu' // production
  :'http://ruskin.english.selu.edu:8080' // dev server
export const SERVER_XML_DIRECTORY = `${SERVER_ROOT}/web/xml`
export const SERVER_SHOWCASE_DIRECTORY = `${SERVER_ROOT}/web/pages`
export const SERVER_HTML_DIRECTORY = `${SERVER_ROOT}/web/pages`

export const GA_TRACKING_ID = 'UA-134616383-1'

// if (isBrowser) {
//   console.log('process.env is ', process.env)
//   console.log('server root is ', SERVER_ROOT)
// }

