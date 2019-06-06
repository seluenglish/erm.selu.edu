import DocumentMeta from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import { app as appCopy } from 'app/copy'
import Footer from 'app/components/Footer/Footer'
import HeadNavigation from 'app/components/HeadNavigation/HeadNavigation'
import FlashMessages from 'app/components/@FlashMessages/FlashMessages'
import style from './App.module.scss'
import { isBrowser } from 'app/utils'
import { initializeFontAwesome } from 'helpers/font-awesome'
import ScrollUp from 'app/components/ScrollToTopExtension/ScrollToTopExtension';
import scrollIcon from 'assets/up_arrow_round.png'
import ScrollManagerWrapper from 'app/components/ScrollManager/ScrollManagerWrapper'
import LoadingComponent from 'app/components/Loading/Loading'

const log = debug('App.js')

const LoadingPage = ({ pastDelay }) => (
  pastDelay ? <div>{appCopy.loading}</div> : null
)

const LoadableHomeRoute = Loadable({
  loader: () => import('../../routes/HomeRoute/HomeRoute'),
  loading: LoadingPage,
  webpack: () => [ require.resolveWeak('../../routes/HomeRoute/HomeRoute') ],
  modules: [ '../../routes/HomeRoute/HomeRoute' ],
})

const LoadableUpdateDbRoute = Loadable({
  loader: () => import('../../routes/UpdateDbRoute/UpdateDbRoute'),
  loading: LoadingPage,
  webpack: () => [ require.resolveWeak('../../routes/UpdateDbRoute/UpdateDbRoute') ],
  modules: [ '../../routes/UpdateDbRoute/UpdateDbRoute' ],
})

const LoadableSearchRoute = Loadable({
  loader: () => import('../../routes/SearchRoute/SearchRoute'),
  loading: LoadingPage,
  webpack: () => [ require.resolveWeak('../../routes/SearchRoute/SearchRoute') ],
  modules: [ '../../routes/SearchRoute/SearchRoute' ],
})

const LoadableSearchDocumentRoute = Loadable({
  loader: () => import('../../routes/SearchDocumentRoute/SearchDocumentRoute'),
  loading: LoadingPage,
  webpack: () => [ require.resolveWeak('../../routes/SearchDocumentRoute/SearchDocumentRoute') ],
  modules: [ '../../routes/SearchDocumentRoute/SearchDocumentRoute' ],
})

const LoadableXmlRoute = Loadable({
  loader: () => import('../../routes/XmlRoute/XmlRoute'),
  loading: LoadingPage,
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
        <ScrollManagerWrapper />

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
              component={LoadableUpdateDbRoute}
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
        <LoadingComponent />

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
