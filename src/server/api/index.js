import { STATUS_CODES } from 'http'
import Router from 'koa-router'
import koaBody from 'koa-body'

const parseBody = koaBody()

export const apiRouter = new Router({ prefix: '/api' })

export function setApiRoutes() {
  apiRouter.stack.length = 0

  apiRouter
    .all('ping', '/ping', parseBody, (ctx) => {
      ctx.response.body = { pong: ctx.request.body }
    })
    .get('bar', '/bar', (ctx) => {
      ctx.response.body = { bar: [ 'lorem', 'ipsum', 'dolor', 'sit', 'amet' ] }
    })
    .post('update_db', '/update_db', (ctx) => {
      const password = ctx.request.body.password;
      
      const realPassword = process.env.DB_UPDATE_PASSWORD
      
      if (password === realPassword) {
        ctx.response.body = { success: true }
      } else {
        ctx.response.status = 401
        ctx.response.body = { error: 1, message: 'Wrong password!' }
      }
    })
    .all('not-found', '*', (ctx) => {
      ctx.response.status = 404
      ctx.response.body = { error: STATUS_CODES[ctx.response.status] }
    })
}
