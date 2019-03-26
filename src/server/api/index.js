import { STATUS_CODES } from 'http'
import Router from 'koa-router'
import koaBody from 'koa-body'
import search from './search'

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
    .post('search', '/search', search)
    .get('nameTypes', '/nameTypes', (ctx) => {
      ctx.response.body = [ 'a', 'b', 'c' ]
    })
    .get('page', '*', (ctx) => {
      ctx.set('Content-Type', 'text/html')
      ctx.response.body = '<html>cat</html>'
    })
    .all('not-found', '*', (ctx) => {
      ctx.set('Content-Type', 'text/html')
      ctx.response.status = 404
      ctx.response.body = { error: STATUS_CODES[ctx.response.status] }
    })
}
