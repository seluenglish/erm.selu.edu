import { SET_CLIENT_ID } from 'app/modules/server-update-db/server-update-db.constants'
import updateDb from './update-db'

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function applyIncomingSocketHooks(action, socket) {
  
  const clientId = action.meta.client
  
  switch (action.type) {
    case SET_CLIENT_ID: {
      await updateDb(action.payload, clientId)
      
      break
    }
    default:
      return false
  }
}
