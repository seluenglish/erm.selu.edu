import Koa from 'koa'
import compress from 'koa-compress'
import convert from 'koa-convert'
import session from 'koa-session-store'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import { ASSETS } from 'config/paths'
import handleError from 'server/middleware/handle-error'
import json from 'koa-json'

const app = new Koa()
const koaBody = require('koa-body')

app.keys = [ 'd0n7', '7311', '4ny0n3' ]
app.use(json())
app.use(koaBody())
app.use(compress())
app.use(favicon(`${ASSETS}/favicon.ico`))
app.use(convert(session()))


// reads process.env.DEBUG
/* istanbul ignore if  */
if (debug.enabled('server')) {
  app.use(logger())
}

app.use(handleError)

export default app
