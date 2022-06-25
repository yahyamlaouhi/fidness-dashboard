import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/basic-ui', state: 'basicUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/user-pages', state: 'userPagesMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
      { path: '/prediction', state: 'predictionMenuOpen' },
      { path: '/partner', state: 'tablesMenuOpen' },


    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    }));

  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">

        <ul className="nav">

          <li className="nav-item nav-category">
            <span className="nav-link"><Trans>Navigation</Trans></span>
          </li>
          <li className={this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
            </Link>
          </li>

          <li className={this.isPathActive('/prediction') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.predictionMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('predictionMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-contacts"></i>
              </span>
              <span className="menu-title"><Trans>Prediction</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.predictionMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/prediction/mdi') ? 'nav-link active' : 'nav-link'} to="/prediction"><Trans>Churn Customer</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

          <li className={this.isPathActive('/partner') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.iconMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('iconsMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-account-circle"></i>
              </span>
              <span className="menu-title"><Trans>Partners</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.iconsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/partner/add-partner') ? 'nav-link active' : 'nav-link'} to="/partner/add-partner"><Trans>Add Partner</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
            {/* <Collapse in={ this.state.iconsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/partner/update-partner') ? 'nav-link active' : 'nav-link' } to="/partner/update-partner"><Trans>Update Partner</Trans></Link></li>
                </ul>
              </div>
            </Collapse> */}
            <Collapse in={this.state.iconsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/partner/get-partner') ? 'nav-link active' : 'nav-link'} to="/partner/partenarList"><Trans>Partner List</Trans></Link></li>
                </ul>
              </div>
            </Collapse>

            <Collapse in={this.state.iconsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/partnersdashboard') ? 'nav-link active' : 'nav-link'} to="/partnersdashboard"><Trans>Dashboard</Trans></Link></li>
                </ul>
              </div>
            </Collapse>


          </li>

          <li className={this.isPathActive('/user-pages') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('userPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-security"></i>
              </span>
              <span className="menu-title"><Trans>User Registration</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.userPagesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/register') ? 'nav-link active' : 'nav-link'} to="/register"><Trans>Register</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/listuser') ? 'nav-link active' : 'nav-link'} to="/listuser"><Trans>User List</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);