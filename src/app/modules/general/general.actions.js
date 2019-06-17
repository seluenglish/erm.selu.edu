import {
  SHOW_FOOTER,
  HIDE_FOOTER,
  HIDE_NAVBAR,
  SHOW_NAVBAR,
} from './general.constants'

export const showFooter = () => ({
  type: SHOW_FOOTER,
})


export const hideFooter = () => ({
  type: HIDE_FOOTER,
})

export const hideNavbar = () => ({
  type: HIDE_NAVBAR,
})

export const showNavbar = () => ({
  type: SHOW_NAVBAR,
})

