import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navigation/Navbar";

const NavbarRoot = () => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
};

export default NavbarRoot;
