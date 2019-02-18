import React from 'react'
import { Provider } from 'react-redux'
import { sagaMiddleware } from 'app/composition/middleware'
import rootSaga from 'app/sagas'
import App from 'app/components/App/App'
import ReactGA from 'react-ga';
import { GA_TRACKING_ID } from 'config/constants'
import { isBrowser } from 'app/utils'

ReactGA.initialize(GA_TRACKING_ID, {
  debug: false,
})

export const Main = (store, history, Router) => {
  history.listen(location => {
    ReactGA.pageview(location.pathname + location.hash)
  })

  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  )
}

export const run = () => sagaMiddleware.run(rootSaga)
