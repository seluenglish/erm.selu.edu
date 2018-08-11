// import { Document } from 'server/database/models'
import uuid from 'uuid'

const registeredTokens = []

export default function (ctx) {
  const password = ctx.request.body.password
  
  const realPassword = process.env.DB_UPDATE_PASSWORD
  
  if (password !== realPassword) {
    ctx.response.status = 401
    ctx.response.body = { error: 1, message: 'Wrong password!' }
  }
  
  const token = uuid.v1()
  
  registeredTokens.push(token)
  
  // console.log(io.socket.clients())
  // console.log(global.socketServer.clients.forEach(client => {
    // client.dispatch({})
    // console.log(client)
  // }))
  // global.socketServer.dispatch({type: 'hello'})
  
  const ret = {
    token,
  }
  ctx.response.body = ret
}
