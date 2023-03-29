import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Navigatoer = () => {
  return (
    <>
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav metismenu" id="side-menu">
            <li className="nav-header">
              <div className="dropdown profile-element">
                <img
                  alt="image"
                  className="rounded-circle"
                  src="img/profile_small.jpg"
                />
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                  <span className="block m-t-xs font-bold">David Williams</span>
                  <span className="text-muted text-xs block">
                    Art Director <b className="caret"></b>
                  </span>
                </a>
                <ul className="dropdown-menu animated fadeInRight m-t-xs">
                  <li>
                    <a className="dropdown-item" href="profile.html">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="contacts.html">
                      Contacts
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="mailbox.html">
                      Mailbox
                    </a>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li>
                    <a className="dropdown-item" href="login.html">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
              <div className="logo-element">IN+</div>
            </li>
            <li className="active">
              <a href="index.html">
                <i className="fa fa-th-large"></i>{" "}
                <span className="nav-label">Dashboards</span>{" "}
                <span className="fa arrow"></span>
              </a>
              <ul className="nav nav-second-level">
                <li className="active">
                    <Link to={'/'}>Main</Link>
                </li>
                <li>
                    <Link to={'/BoardList'}>BoardList</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/"}>
                <i className="fa fa-diamond"></i>{" "}
                <span className="nav-label">Layouts</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigatoer;
