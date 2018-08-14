import { STATUS_CODES } from 'http'
import Router from 'koa-router'
import koaBody from 'koa-body'
import update_db from './update_db'

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
    .post('update_db', '/update_db', update_db)
    .get('docTypes', '/docTypes', (ctx) => {
      ctx.response.body = ['a', 'b', 'c']
    })
    .get('subDocTypes', '/subDocTypes', (ctx) => {
      ctx.response.body = ['d', 'e', 'f']
    })
    .all('not-found', '*', (ctx) => {
      ctx.set('Content-Type', 'text/html')
      ctx.response.status = 404
      ctx.response.body = { error: STATUS_CODES[ctx.response.status] }
    })
}
