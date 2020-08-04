import Router from 'koa-router'
import compose from 'koa-compose'
import Loadable from 'react-loadable'
import setStore from 'server/middleware/set-store'
import renderApp from 'server/middleware/render-app'
import setDocument from 'server/middleware/set-document'
import { deleteNews, editNews, getNews, setNews } from './api/newsPortal'
import { registerUser, verifyEmail } from './api/auth'
import { getAllUsers, setUserPermission } from './api/usersPortal'
const log = debug('server-router')
let User = require('./database/models/user')
const passport = require('koa-passport')

export const rootRouter = new Router()

export async function setRoutes(assets) {
  log('rebuilding route middleware')
  rootRouter.stack.length = 0
  await Loadable.preloadAll()
  /* build app from routes, set initial state and set response html */
  const renderReactApp = compose([
    /* set a store for server side state rendering */
    setStore,
    setDocument,
    /* give assets from bundle, set response body from react app */
    renderApp(assets),
  ])
  const { apiRouter, setApiRoutes } = require('server/api'),
    localStrategy = require('passport-local')
  passport.use(new localStrategy(User.authenticate()))
  setApiRoutes()
  require('./api/auth')
  rootRouter
    .use(apiRouter.routes())
    /* render error page when problem found */
    .get('/getNews', ctx => getNews(ctx))
    .post('/createNews', ctx => setNews(ctx))
    .put('/editNews/:id', ctx => editNews(ctx))
    .delete('/deleteNews/:id', ctx => deleteNews(ctx))
    .get('/allUsers', ctx => getAllUsers(ctx))
    .put('/setUserPermission/:userId', ctx => setUserPermission(ctx))
    .post('/register', ctx => registerUser(ctx))
    .post('/login', async (ctx, next) => {
      await passport.authenticate('local', async function (err, user, info) {
        if (err) {
          return err
        }
        if (!user) {
          ctx.body = false
        } else {
          ctx.logIn(user, function (err) {
            if (err) {
              console.log('verification failed')
              ctx.body = false
            } else {
              console.log('verified')
              ctx.body = user
            }
          })
        }
        await next()
      })(ctx, next)
    })
    .get('/isLoggedIn', async (ctx) => {
      let session
      if (ctx.session.passport) {
        let user = await User.findOne({ username: ctx.session.passport.user })
        session = {
          session: ctx.session,
          verifiedEmail: user.verified,
        }
      } else {
        session = {
          session: null,
          verifiedEmail: false,
        }
      }
      ctx.body = session
    })
    .get('/verify/:username/id/:token', ctx => verifyEmail(ctx))
    .get('/logout', (ctx) => {
      ctx.session = null
      ctx.body = 'done'
    })
    .get('error', '/oops', renderReactApp)
    /* render react app for all other routes */
    .get('react', '/(.*)', renderReactApp)
}
