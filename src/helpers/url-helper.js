export const SERVER_ROOT = 'http://localhost:9001'

export function getUrl(path) {
  return `${SERVER_ROOT}/${path}`
}
