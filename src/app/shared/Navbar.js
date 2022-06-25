import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';




export default function Navbar() {

  let { logoutUser } = useContext(AuthContext)



  return (
    <nav className="navbar p-0 fixed-top d-flex flex-row">
      <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
        <button className="navbar-toggler align-self-center" type="button" onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
          <span className="mdi mdi-menu"></span>
        </button>

        <ul className="navbar-nav navbar-nav-right">


          <Dropdown alignRight as="li" className="nav-item">
            <Dropdown.Toggle as="a" className="nav-link cursor-pointer no-caret">
              <div className="navbar-profile">
                <img className="img-xs rounded-circle" src={require('../../assets/images/faces/face15.png')} alt="profile" />
                <p className="mb-0 d-none d-sm-block navbar-profile-name"><Trans>Hi {JSON.parse(localStorage.getItem("username"))}</Trans></p>
                <i className="mdi mdi-menu-down d-none d-sm-block"></i>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
              <h6 className="p-3 mb-0"><Trans>Profile</Trans></h6>

              <Dropdown.Item href="!#" onClick={() => logoutUser()} className="preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-logout text-danger"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject mb-1"><Trans>Log Out</Trans></p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
            </Dropdown.Menu>
          </Dropdown>
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" >
          <span className="mdi mdi-format-line-spacing"></span>
        </button>
      </div>
    </nav>
  );
}








