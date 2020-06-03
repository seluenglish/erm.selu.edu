import Router from 'koa-router'
import compose from 'koa-compose'
import Loadable from 'react-loadable'
import setStore from 'server/middleware/set-store'
import renderApp from 'server/middleware/render-app'
import setDocument from 'server/middleware/set-document'

const log = debug('server-router')


import { deleteNews, editNews, getNews, setNews } from './api/newsPortal'
import { registerUser } from './api/auth'

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

  const { apiRouter, setApiRoutes } = require('server/api')


  setApiRoutes()
  require('./api/auth')
  rootRouter
    .use(apiRouter.routes())
    /* render error page when problem found */

    .get('/getNews', ctx=>getNews(ctx) )
    .post('/createNews',ctx=>setNews(ctx) )
    .put('/editNews/:id', ctx=>editNews(ctx))
    .delete('/deleteNews/:id',ctx=>deleteNews(ctx))


    .post('/registerUser', ctx=>registerUser(ctx) )

    .post('/login', async (ctx, next) =>{
      await passport.authenticate('local', async function(err, user, info) {
        if (err) { return err }
        if (!user) {
          ctx.body=false
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
      })(ctx, next) })
    // .post('/login', async (ctx, next)=>{
    //   console.log('00000000')
    //   await next()
    // },ctx=>{
    //   ctx.body=true
    // })
    .get('error', '/oops', renderReactApp)
    /* render react app for all other routes */
    .get('react', '/(.*)', renderReactApp)

}

