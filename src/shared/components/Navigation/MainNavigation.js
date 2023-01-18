import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Hamburger from "../UIElements/Hamburger";

import "./MainNavigation.css";
import "./NavLinks.css";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const drawerHandler = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  return (
    <React.Fragment>
      <Backdrop
        classNames="slide-in-left2"
        timeout={500}
        show={drawerIsOpen}
        onClick={closeDrawerHandler}
      ></Backdrop>

      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        {drawerIsOpen ? (
          <Hamburger className=" active" onClick={drawerHandler}></Hamburger>
        ) : (
          <Hamburger className="" onClick={drawerHandler}></Hamburger>
        )}

        <h1 className="main-navigation__title">
          <Link to="/">SkiPlaces</Link>
        </h1>

        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
