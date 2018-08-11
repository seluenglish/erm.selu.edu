export default class ResponseError extends Error {
  
  constructor(response, json, endpoint = '') {
    super(`Response error: ${endpoint}`)
    
    this.endpoint = endpoint
    this.status = response.status
    this.json = json
  }
  
}
