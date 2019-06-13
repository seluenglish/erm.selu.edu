import { SERVER_SHOWCASE_DIRECTORY } from 'config/constants'

export const redirectShowcaseElem = (pathname, hash) => {
  if (!hash) hash = ''
  window.location.replace(`${SERVER_SHOWCASE_DIRECTORY}${pathname}.php${hash}`)
}
