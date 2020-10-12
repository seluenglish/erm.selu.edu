import { typeToReducer } from 'app/utils'
import {
  SHOW_NAVBAR,
  HIDE_NAVBAR,

  SHOW_FOOTER,
  HIDE_FOOTER,
} from './general.constants'
import update from 'immutability-helper'

const initialState = {
  showNavbar: true,
  showFooter: true,
}


export const generalReducers = typeToReducer({
  [SHOW_NAVBAR]: state => update(state, {
    showNavbar: { $set: true },
  }),
  [HIDE_NAVBAR]: state => update(state, {
    showNavbar: { $set: false },
  }),
  [SHOW_FOOTER]: state => update(state, {
    showFooter: { $set: true },
  }),
  [HIDE_FOOTER]: state => update(state, {
    showFooter: { $set: false },
  }),
}, initialState)
