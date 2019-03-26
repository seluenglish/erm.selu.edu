import { PENDING, REJECTED, FULFILLED } from 'redux-promise-middleware'
import { typeToReducer, get, isBrowser } from 'app/utils'
import {
  SHOW_NAVBAR
} from './page-utils.constants'

const initialState = {
  error: '',
  data: {

    showNavbar: false,
  },
}

export const pageUtilsReducers = typeToReducer({

}, initialState)
