import { START_CONNECTION } from 'app/modules/server-update-db/server-update-db.constants'

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function applyIncomingSocketHooks(action, socket) {

  const clientId = action.meta.client

  switch (action.type) {
    case START_CONNECTION: {
      const updateDb = require('./update-db')
      await updateDb(action.payload, clientId)

      break
    }
    default:
      return false
  }
}
