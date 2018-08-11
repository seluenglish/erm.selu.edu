import 'config/environment'
import 'helpers/css-modules-hook'
import 'helpers/clean-asset-json'
import http from 'http'
import serve from 'koa-static'
import hotReload from 'helpers/hot-reload'
import { isEnv, isBrowser } from 'app/utils'
import { ROOT, SERVER, SOCKETS, STATIC } from 'config/paths'
import { isomorphicTools, isomorphicPlugin } from 'server/isomorphic-tools'
import app from 'server-instance'
import bodyparser from 'koa-bodyparser'
import dotenv from 'dotenv'
import { DB_CONN_STRING } from './server/config'
import mongoose from 'mongoose'

if (!isBrowser) {
  dotenv.config()
  mongoose.connect(DB_CONN_STRING)
}

const log = debug('app')

if (isEnv('development')) {
  isomorphicPlugin.development()
  hotReload(app)
} else {
  app.use(serve(STATIC))
}

app.use(bodyparser())

isomorphicTools.server(ROOT, async () => {
  if (isEnv('development')) {
    app.use(async (ctx, next) => {
      const { rootRouter, setRoutes } = require(`${SERVER}/router`)
      await setRoutes(isomorphicTools.assets())
      await rootRouter.routes()(ctx, next)
    })
  } else {
    const { rootRouter, setRoutes } = require(`${SERVER}/router`)
    await setRoutes(isomorphicTools.assets())
    app.use(rootRouter.routes())
  }
})

const server = http.createServer(app.callback())
global.socketServer = require(SOCKETS)(server)

server.listen(process.env.PORT, () => {
  log('listening to', `http://localhost:${process.env.PORT}`)
})
