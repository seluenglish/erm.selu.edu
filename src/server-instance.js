import Koa from 'koa'
import compress from 'koa-compress'
import convert from 'koa-convert'
import session from 'koa-session-store'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import { ASSETS } from 'config/paths'
import handleError from 'server/middleware/handle-error'
import json from 'koa-json'

const methodOverride = require('koa-methodoverride')
const passport = require('koa-passport'),
  User = require('./server/database/models/user')

const app = new Koa()
const koaBody = require('koa-body')
const bodyParser = require('koa-bodyparser')

app.keys = [ 'd0n7', '7311', '4ny0n3' ]
app.use(methodOverride())
app.use(koaBody())
app.use(bodyParser())

app.use(passport.initialize())
app.use(passport.session())



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(compress())
app.use(favicon(`${ASSETS}/favicon.ico`))
app.use(convert(session()))
app.use(json())


// reads process.env.DEBUG
/* istanbul ignore if  */
if (debug.enabled('server')) {
  app.use(logger())
}

app.use(handleError)

export default app
