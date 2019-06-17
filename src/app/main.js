import React from 'react'
import { Provider } from 'react-redux'
import App from 'app/components/App/App'
import { initialize, pageview } from 'react-ga'
import { GA_TRACKING_ID } from 'config/constants'
import { isBrowser } from 'app/utils'


if (isBrowser) {
  initialize(GA_TRACKING_ID, {
    debug: false,
  })
}

export const Main = (store, history, Router) => {
  // < HACK >
  if (!isBrowser) {
    global.window = {}
  }
  // </ HACK >

  history.listen(location => {
    pageview(location.pathname + location.hash)
  })

  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  )
}
