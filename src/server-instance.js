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
const session = require('koa-session');
require('./server/api/auth')
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: true, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.use(session(CONFIG, app));

app.keys = [ 'd0n7', '7311', '4ny0n3' ]
app.use(methodOverride())
app.use(koaBody())
app.use(bodyParser())

app.use(session({},app));

app.use(passport.initialize())
app.use(passport.session())



passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

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
