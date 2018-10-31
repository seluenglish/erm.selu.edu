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
import avatarPath from 'assets/avatar.jpeg'
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

const LoadableBarRoute = Loadable({
  loader: () => import('../../routes/BarRoute/BarRoute'),
  loading: Loading,
  webpack: () => [ require.resolveWeak('../../routes/BarRoute/BarRoute') ],
  modules: [ '../../routes/BarRoute/BarRoute' ],
})

const LoadableOopsRoute = Loadable({
  loader: () => import('../../routes/OopsRoute/OopsRoute'),
  loading: Loading,
  webpack: () => [ require.resolveWeak('../../routes/OopsRoute/OopsRoute') ],
  modules: [ '../../routes/OopsRoute/OopsRoute' ],
})

const LoadableNotFoundRoute = Loadable({
  loader: () => import('../../routes/NotFoundRoute/NotFoundRoute'),
  loading: Loading,
  webpack: () => [ require.resolveWeak('../../routes/NotFoundRoute/NotFoundRoute') ],
  modules: [ '../../routes/NotFoundRoute/NotFoundRoute' ],
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
        {/*<HeadNavigation />*/}
        <FlashMessages />
        {/*<SideNavigation />*/}
        <main className={style.content}>
          <Switch>
            {/*<Route*/}
              {/*exact*/}
              {/*path='/'*/}
              {/*component={LoadableHomeRoute}*/}
            {/*/>*/}
            <Route
              path='/search'
              component={LoadableSearchRoute}
            />
            {/*<Route*/}
              {/*path='/bar'*/}
              {/*component={LoadableBarRoute}*/}
            {/*/>*/}
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
              component={LoadableNotFoundRoute}
            />
          </Switch>
        </main>
      </div>
    )
  }
}

export default hot(module)(App)
