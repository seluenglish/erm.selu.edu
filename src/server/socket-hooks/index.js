import { START_CONNECTION } from 'app/modules/server-update-db/server-update-db.constants'
import updateDb from './update-db'

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function applyIncomingSocketHooks(action, socket) {
  
  const clientId = action.meta.client
  
  switch (action.type) {
    case START_CONNECTION: {
      await updateDb(action.payload, clientId)
      
      break
    }
    default:
      return false
  }
}
