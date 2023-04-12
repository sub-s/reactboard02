import React, { useState } from "react";
import { Link } from "react-router-dom";
import myImage from '../../assets/img/profile_small.jpg';

const Navigatoer = () => {
  const [num, setNum] = useState(0);
  const toggleActive = (e, index) => {
    setNum(index);
  };
  const menu = [
    { menu: "Main", url: "/" },
    { menu: "Board", url: "/BoardList" },
  ];
  // 메뉴 아이템
  const menuItem =
    menu &&
    menu.map((item, index) => (
      <li
        key={index}
        className={index === num ? "active" : ""}
        onClick={(e) => toggleActive(e, index)}
      >
        <Link to={item.url}>{item.menu}</Link>
      </li>
    ));
  return (
    <>
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav metismenu" id="side-menu">
            <li className="nav-header">
              <div className="dropdown profile-element">
                <img src={myImage} className={'rounded-circle'} />

                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                  <span className="block m-t-xs font-bold">David Williams</span>
                  <span className="text-muted text-xs block">
                    Art Director <b className="caret"></b>
                  </span>
                </a>
              </div>
              <div className="logo-element">IN+</div>
            </li>
            <li className="active">
              <a href="index.html">
                <i className="fa fa-th-large"></i>
                <span className="nav-label">Dashboards</span>
                <span className="fa arrow"></span>
              </a>
              <ul className="nav nav-second-level">{menuItem}</ul>
            </li>
            <li>
              <Link to={"/"}>
                <i className="fa fa-diamond"></i>
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
