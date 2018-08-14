// export const SERVER_ROOT = 'http://localhost:9001'
export const SERVER_ROOT = 'http://ruskin.local:8080/src'

export function getUrl(path) {
  return `${SERVER_ROOT}/${path}`
}
