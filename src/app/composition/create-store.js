import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from 'app/composition/root-reducer'
import { middleware } from 'app/composition/middleware'


const log = debug('create-store')

export default (initialState, mware=middleware, browserMode=false) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...mware),
    ),
  )

  if (module.hot) {
    module.hot.accept('app/composition/root-reducer', () => {
      const rootReducer = require('app/composition/root-reducer')
      log(`Replacing store's root reducer`)
      store.replaceReducer(rootReducer)
    })
  }

  return store
}
