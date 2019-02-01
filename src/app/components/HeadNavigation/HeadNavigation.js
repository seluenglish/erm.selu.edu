import cx from 'classnames'
import { NavLink } from 'react-router-dom'
import { nav as navCopy } from 'app/copy'
import styles from './HeadNavigation.module.scss'
import QuickSearchBox from '../QuickSearchBox/QuickSearchBox'
import headerIcon from 'assets/ErmIcon.png'
import {hot} from 'react-hot-loader'
import { isEnv } from 'app/utils'


// Putting this inside a connect will break activeClassName
// unless you also subscribe to changes to routing state or context
export class HeadNavigation extends React.Component {

  constructor(props) {
    super(props)


    this.toggleIndices = this.toggleIndices.bind(this)
    this.handleMenuClick = this.handleMenuClick.bind(this)

    this.state = {
      indicesExpanded: false,
    }
  }

  handleMenuClick(e){
    const toggler = $('.navbar-toggler')
    if (toggler.is(':visible')) {
      toggler.click();
    }
  }

  toggleIndices() {
    const { indicesExpanded } = this.state

    this.setState({
      indicesExpanded: !indicesExpanded,
    })
  }
  render() {
    const { indicesExpanded } = this.state

    return (
      <div className='HeadNavigation'>

        <div className='title'>
          The Early Ruskin Manuscripts
          <div className='subtitle'>1826-1842</div>
        </div>

        <nav className='navbar navbar-expand-md navbar-dark bg-dark fixed-top'>
          <NavLink
            to='/'
            className='navbar-brand'
          >
            <img src={headerIcon} alt='Early Ruskin Manuscripts' />
          </NavLink>

          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarsExampleDefault'
            aria-controls='navbarsExampleDefault'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>

          <div
            className='collapse navbar-collapse'
            id='navbarsExampleDefault'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <NavLink
                  exact
                  to='/'
                  className='nav-link'
                  onClick={this.handleMenuClick}>
                  {navCopy.home}
                </NavLink>
              </li>
              <li className='nav-item dropdown'>
                <NavLink
                  to='/indices'
                  className='nav-link dropdown-toggle'
                  aria-expanded='false'
                  aria-haspopup='true'
                  id='dropdown01'
                  onClick={this.handleMenuClick}
                  data-toggle='dropdown'>
                  {navCopy.indices}
                </NavLink>
                <div
                  className='dropdown-menu'
                  aria-labelledby='dropdown01'
                  aria-expanded='false'>
                  <NavLink
                    to='/essays/indices_essay#WORKS'
                    className='dropdown-item'
                    onClick={this.handleMenuClick}>{navCopy.works}</NavLink>
                  <NavLink
                    to='/essays/indices_essay#MANUSCRIPTS'
                    className='dropdown-item'
                    onClick={this.handleMenuClick}>{navCopy.manuscripts}</NavLink>
                  <NavLink
                    to='/essays/indices_essay#CORPORA'
                    className='dropdown-item'
                    onClick={this.handleMenuClick}>{navCopy.corpora}</NavLink>
                  <NavLink
                    to='/essays/indices_essay#WORKSBYOTHERS'
                    className='dropdown-item'
                    onClick={this.handleMenuClick}>{navCopy.workByOthers}</NavLink>
                  <NavLink
                    to='/essays/indices_essay#COMMENTARY'
                    className='dropdown-item'
                    onClick={this.handleMenuClick}>{navCopy.commentary}</NavLink>
                  <NavLink
                    to='/essays/indices_essay#ESSAYS'
                    className='dropdown-item'
                    onClick={this.handleMenuClick}>{navCopy.essays}</NavLink>
                  <NavLink
                    to='/essays/indices_essay#DRAWINGS'
                    className='dropdown-item'
                    onClick={this.handleMenuClick}>{navCopy.drawings}</NavLink>
                  {isEnv('development') && (
                    <NavLink
                      exact
                      to='/update_db'
                      onClick={this.handleMenuClick}
                      className='dropdown-item'>Update DB</NavLink>
                  )}
                </div>
              </li>
              <li className='nav-item'>
                <NavLink
                  exact
                  to='/xml'
                  onClick={this.handleMenuClick}
                  className='nav-link'>{navCopy.xml}</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  exact
                  to='/notes/bibliography'
                  onClick={this.handleMenuClick}
                  className='nav-link'>{navCopy.bibliography}</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  exact
                  to='/webpages/staff'
                  onClick={this.handleMenuClick}
                  className='nav-link'>{navCopy.staffAndSupport}</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  exact
                  to='/webpages/legal'
                  onClick={this.handleMenuClick}
                  className='nav-link'>{navCopy.legal}</NavLink>
              </li>

            </ul>


            <QuickSearchBox onClick={this.handleMenuClick} />

          </div>
        </nav>

      </div>


    )
  }
}

export default hot(module)(HeadNavigation)
