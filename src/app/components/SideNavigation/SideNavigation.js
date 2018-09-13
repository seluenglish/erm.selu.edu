import cx from 'classnames'
import { NavLink, Link } from 'react-router-dom'
import { nav as navCopy } from 'app/copy'
import { getUrl } from 'helpers/url-helper'
import QuickSearchBox from 'app/components/QuickSearchBox/QuickSearchBox'
import { hot } from 'react-hot-loader'

export class SideNavigation extends React.Component {
  constructor(props) {
    super(props)
    
    this.onQuickSearch = this.onQuickSearch.bind(this)
  }
  
  onQuickSearch(searchParams) {
    console.log('searching', searchParams)
    
  }
  
  render() {
    const logoUrl = getUrl('images/ruskin_logo.jpg')
    
    return (
      <nav className='SideNavigation no-print'>
        
        <Link
          to='/'
          className={'brand'}>
          <img
            src={logoUrl}
            alt='Ruskin logo'
          />
        </Link>
        
        <div className='navigationTitle'>
          The <br />
          Early <br />
          Ruskin <br />
          Manuscripts <br />
          <div className='navigationDate'>1826&#x2013;1842</div>
        </div>
        
        <hr />
  
        <div className='navigationEditor'>
          <a href='mailto:ruskinproject@selu.edu'>
            David C. Hanson, Editor
          </a>
        </div>
        
        <QuickSearchBox />
        
        
        <div className='navItems'>
          <NavLink
            exact
            activeClassName={'active'}
            to='/'>
            {navCopy.home}
          </NavLink>
          
          <NavLink
            activeClassName={'active'}
            to='/search'>
            {navCopy.search}
          </NavLink>
          
          <NavLink
            activeClassName={'active'}
            to='/indices'>
            Indices
          </NavLink>
          
          <NavLink
            activeClassName={'active'}
            to='/indices/worksomething'>
            WorkSomething
          </NavLink>
          
          <NavLink
            activeClassName={'active'}
            to='/indices/essay'>
            Essay
          </NavLink>
        
        </div>
      </nav>
    )
  }
}

export default hot(module)(SideNavigation)
