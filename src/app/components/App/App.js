import DocumentMeta from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import { app as appCopy } from 'app/copy'
import Footer from 'app/components/Footer/Footer'
import HeadNavigation from 'app/components/HeadNavigation/HeadNavigation'
import SideNavigation from 'app/components/SideNavigation/SideNavigation'
import FlashMessages from 'app/components/@FlashMessages/FlashMessages'
import PrivateRoute from 'app/routes/PrivateRoute/PrivateRoute'
import UpdateDbRoute from 'app/routes/UpdateDbRoute/UpdateDbRoute'
import style from './App.module.scss'
import { isBrowser } from 'app/utils'
import XmlRoute from 'app/routes/XmlRoute/XmlRoute'
import { initializeFontAwesome } from 'helpers/font-awesome'
import ScrollUp from 'app/components/ScrollToTopExtension/ScrollToTopExtension';
import scrollIcon from 'assets/up_arrow_round.png'

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

const LoadableXmlRoute = Loadable({
  loader: () => import('../../routes/XmlRoute/XmlRoute'),
  loading: Loading,
  webpack: () => [ require.resolveWeak('../../routes/XmlRoute/XmlRoute') ],
  modules: [ '../../routes/XmlRoute/XmlRoute' ],
})

initializeFontAwesome()

export default class App extends React.Component {
  constructor(props) {
    super(props)

    let showNavbar = false

    this.state = {
      showNavbar,
      showFooter: false,
    }
  }
  componentDidMount(){
    if (typeof window !== 'undefined') {
      const showNavbar = window.location.href.indexOf('show_navbar=0') === -1
      this.setState({
        showNavbar,
        showFooter: true
      })
    }
  }
  render() {
    const { showNavbar, showFooter } = this.state
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
        <HeadNavigation showNavbar={showNavbar} />
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
            <Route
              path={'/update_db'}
              component={UpdateDbRoute}
            />
            <Route
              path={'/xml'}
              component={LoadableXmlRoute}
            />
            <Route
              component={LoadableSearchDocumentRoute}
            />
          </Switch>
        </main>

        <ScrollUp
          showUnder={350}
          duration={1}
          style={{
            transitionDuration: '0s',
            transitionTimingFunction: 'linear',
            transitionDelay: '0s',
            bottom: '25px',
            right: '25px',
          }}
        >
          <img src={scrollIcon} alt='Back to top' />
        </ScrollUp>


        <Footer showFooter={showFooter} />
      </div>
    )
  }
}
