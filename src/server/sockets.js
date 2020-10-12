import Socket from 'socket.io'
import { inServerViaSocketIO, outServerViaSocketIO } from 'redux-via-socket.io'
import { middleware } from 'app/composition/middleware'
import createStore from 'app/composition/create-store'
import { applyIncomingSocketHooks } from 'server/socket-hooks'

const log = debug('sockets-server')

export default function sockets(server) {
  log('Starting socket server')
  const socketServer = Socket(server)

  const socketsStore = createStore(
    {},
    [ ...middleware, outServerViaSocketIO(socketServer) ],
  )

  global.store = socketsStore

  socketServer.on('connection', socket => {
    log('New connection made with id', socket.id)
    socket.on('disconnect', () => {
      log('Disconnected', socket.id)
    })
  })

  inServerViaSocketIO(socketServer, (action, socket) => {
    log({
      socket: socket.id,
      ...action,
    })

    applyIncomingSocketHooks(action, socket).then(() => {
    }).catch((err) => {
      console.log('error', err)
    })

    // socketsStore.dispatch(action)
  })

  return socketServer
}
