import DocumentMeta from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import { hot } from 'react-hot-loader'
import { app as appCopy } from 'app/copy'
import HeadNavigation from 'app/components/HeadNavigation/HeadNavigation'
import SideNavigation from 'app/components/SideNavigation/SideNavigation'
import FlashMessages from 'app/components/@FlashMessages/FlashMessages'
import PrivateRoute from 'app/routes/PrivateRoute/PrivateRoute'
import UpdateDbRoute from 'app/routes/UpdateDbRoute/UpdateDbRoute'
import style from './App.module.scss'
import { isBrowser } from 'app/utils'

const log = debug('App.js')

const Loading = ({ pastDelay }) => (
  pastDelay ? <div>{appCopy.loading}</div> : null
)

const LoadableHomeRoute = Loadable({
  loader: () => import('../../routes/HomeRoute/HomeRoute'),
  loading: Loading,
  webpack: () => [ require.resolveWeak('../../routes/HomeRoute/HomeRoute') ],
  modules: [ '../../routes/HomeRoute/HomeRoute' ],
})

const LoadableSearchRoute = Loadable({
  loader: () => import('../../routes/SearchRoute/SearchRoute'),
  loading: Loading,
  webpack: () => [ require.resolveWeak('../../routes/SearchRoute/SearchRoute') ],
  modules: [ '../../routes/SearchRoute/SearchRoute' ],
})

const LoadableSearchDocumentRoute = Loadable({
  loader: () => import('../../routes/SearchDocumentRoute/SearchDocumentRoute'),
  loading: Loading,
  webpack: () => [ require.resolveWeak('../../routes/SearchDocumentRoute/SearchDocumentRoute') ],
  modules: [ '../../routes/SearchDocumentRoute/SearchDocumentRoute' ],
})

class App extends React.Component {
  render() {
    return (
      <div className={style.app}>
        <DocumentMeta
          defaultTitle={`${appCopy.title}`}
          titleTemplate={`%s | ${appCopy.title}`}>
          <html lang='en' />
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width,initial-scale=1.0' />
          <meta name='description' content={appCopy.meta.description} />
          <meta name='keywords' content={appCopy.meta.keywords} />
        </DocumentMeta>
        <HeadNavigation />
        <FlashMessages />
        {/*<SideNavigation />*/}
        <main className={style.content}>
          <Switch>
            <Route
              exact
              path='/'
              component={LoadableHomeRoute}
            />
            <Route
              path='/search'
              component={LoadableSearchRoute}
            />
            {/*<Route*/}
              {/*path='/oops'*/}
              {/*component={LoadableOopsRoute}*/}
            {/*/>*/}
            {/*<Route*/}
              {/*path='/private'*/}
              {/*component={PrivateRoute}*/}
            {/*/>*/}
            <Route
              path={'/update_db'}
              component={UpdateDbRoute}
            />
            <Route
              component={LoadableSearchDocumentRoute}
            />
          </Switch>
        </main>
      </div>
    )
  }
}

export default hot(module)(App)
