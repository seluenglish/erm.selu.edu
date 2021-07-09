import cx from 'classnames'
import { NavLink } from 'react-router-dom'
import { nav as navCopy } from 'app/copy'
import QuickSearchBox from '../QuickSearchBox/QuickSearchBox'
import headerIcon from 'assets/site_logo.png'
import { withRouter } from 'react-router'
import { hot } from 'react-hot-loader'
import $ from 'jquery'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { getShowNavBar } from 'app/modules/general/general.selectors'


/* Original remark */
// Putting this inside a connect will break activeClassName
// unless you also subscribe to changes to routing state or context
/* Damodar's comment: No it doesn't if you use an impure component.
https://github.com/reduxjs/react-redux/blob/v4.0.0/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux */

export class HeadNavigation extends React.Component {

  constructor(props) {
    super(props)

    this.handleMenuClick = this.handleMenuClick.bind(this)
  }


  handleMenuClick(e) {
    const toggler = $('.navbar-toggler')
    if (toggler.is(':visible')) {
      toggler.click()
    }
  }


  render() {
    const { showNavbar } = this.props

    if (!showNavbar) return false

    return (
      <div className='HeadNavigation d-print-none'>


        <div className='title'>
          The Early Ruskin Manuscripts
          <div className='subtitle'>1826-1842</div>
        </div>

        <nav className='navbar navbar-expand-md navbar-dark bg-dark fixed-top'>
          <NavLink
            to='/'
            className='navbar-brand'>
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
                  to='/essays/indices_essay'
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
                    <NavLink
                    to='/essays/indices_essay#Bibliography'
                    className='dropdown-item'
                    onClick={this.handleMenuClick}>{navCopy.drawings}</NavLink>
                </div>
              </li>

              {/*Thursday, September 17, 2020*/}
              {/*Prashant Basnet*/}
              {/*this will have about as a drop down menu*/}
              {/*for task*/}
              {/*In the menu bar, create a head "About" with a pull-down menu. On that menu place (in this order) Plan of the Archive, Editorial and Encoding Rationale and Methodology, Staff and Support, Conditions of Use, XML. "Conditions of Use" is the head I'd prefer in place of "Legal" (and I've changed the header in the Legal xml file accordingly), and I'd prefer "Staff and Support" in place of just "Staff".*/}
              <li className='nav-item dropdown'>
                <NavLink
                  to='/essays/indices_essay'
                  className='nav-link dropdown-toggle'
                  aria-expanded='false'
                  aria-haspopup='true'
                  id='dropdown01'
                  onClick={this.handleMenuClick}
                  data-toggle='dropdown'>
                  {navCopy.about}
                </NavLink>
                <div
                  className='dropdown-menu'
                  aria-labelledby='dropdown01'
                  aria-expanded='false'>
                  {/*first dropdown link*/}
                  <NavLink
                    to='/notes/plan_of_archive_note'
                    className='dropdown-item'
                    onClick={this.handleMenuClick}>{navCopy.plan_of_the_Archive}</NavLink>
                  {/*2nd dropdown link*/}
                  <NavLink
                    to='/notes/editorial_rationale_note'
                    className='dropdown-item'
                    onClick={this.handleMenuClick}>{navCopy.editorial_and_Encoding_Rationale_and_Methodology}</NavLink>
                  {/*3rd dropdown link*/}
                  <NavLink
                    to='/webpages/staff'
                    className='dropdown-item'
                    onClick={this.handleMenuClick}>{navCopy.staffAndSupport}</NavLink>
                  {/*4rth dropdown link*/}
                  <NavLink
                    to='/webpages/legal'
                    className='dropdown-item'
                    onClick={this.handleMenuClick}>{navCopy.legal}</NavLink>

                </div>
              </li>
              <li className='nav-item'>
                <NavLink
                  exact
                  to='/news'
                  className='nav-link'
                  onClick={this.handleMenuClick}>
                  {navCopy.news}
                </NavLink>

              </li>
              {/*<li className='nav-item'>*/}
              {/*  <NavLink*/}
              {/*    exact*/}
              {/*    to='/getAllUser'*/}
              {/*    className='nav-link'*/}
              {/*    onClick={this.handleMenuClick}>*/}
              {/*    {navCopy.news}*/}
              {/*  </NavLink>*/}

              {/*</li>*/}
            </ul>


            <QuickSearchBox onClick={this.handleMenuClick} />

          </div>
        </nav>

      </div>


    )
  }
}

const mapStateToProps = (state) => ({
  showNavbar: getShowNavBar(state),
})

export default hot(module)(connect(mapStateToProps, null, null, {
  pure: false,
})(withRouter(HeadNavigation)))
