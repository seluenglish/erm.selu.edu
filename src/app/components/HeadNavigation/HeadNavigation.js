import cx from 'classnames'
import { NavLink } from 'react-router-dom'
import { nav as navCopy } from 'app/copy'
import styles from './HeadNavigation.module.scss'
import QuickSearchBox from '../QuickSearchBox/QuickSearchBox'
import headerIcon from 'assets/ErmIcon.png'

// Putting this inside a connect will break activeClassName
// unless you also subscribe to changes to routing state or context
export default class HeadNavigation extends React.Component {
  constructor(props) {
    super(props)


    this.toggleIndices = this.toggleIndices.bind(this)

    this.state = {
      indicesExpanded: false,
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
          <NavLink to='/' className='navbar-brand'>
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

          <div className='collapse navbar-collapse' id='navbarsExampleDefault'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <NavLink
                  exact
                  to='/'
                  className='nav-link'>
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
                  data-toggle='dropdown'>
                  {navCopy.indices}
                </NavLink>
                <div
                  className='dropdown-menu'
                  aria-labelledby='dropdown01'
                  aria-expanded='false'>
                  <NavLink to='/essays/indices_essay#WORKS' className='dropdown-item'>{navCopy.works}</NavLink>
                  <NavLink to='/essays/indices_essay#MANUSCRIPTS' className='dropdown-item'>{navCopy.manuscripts}</NavLink>
                  <NavLink to='/essays/indices_essay#CORPORA' className='dropdown-item'>{navCopy.corpora}</NavLink>
                  <NavLink to='/essays/indices_essay#WORKSBYOTHERS' className='dropdown-item'>{navCopy.workByOthers}</NavLink>
                  <NavLink to='/essays/indices_essay#COMMENTARY' className='dropdown-item'>{navCopy.commentary}</NavLink>
                  <NavLink to='/essays/indices_essay#ESSAYS' className='dropdown-item'>{navCopy.essays}</NavLink>
                  <NavLink to='/essays/indices_essay#DRAWINGS' className='dropdown-item'>{navCopy.drawings}</NavLink>
                </div>
              </li>
              <li className='nav-item'>
                <NavLink
                  exact
                  to='/xml'
                  className='nav-link'>{navCopy.xml}</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  exact
                  to='/notes/bibliography'
                  className='nav-link'>{navCopy.bibliography}</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  exact
                  to='/webpages/staff'
                  className='nav-link'>{navCopy.staffAndSupport}</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  exact
                  to='/webpages/legal'
                  className='nav-link'>{navCopy.legal}</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  exact
                  to='/search'
                  className='nav-link'>{navCopy.search}</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  exact
                  to='/update_db'
                  className='nav-link'>Update db</NavLink>
              </li>
            </ul>


            <QuickSearchBox />

          </div>
        </nav>

      </div>


    )
  }
}
