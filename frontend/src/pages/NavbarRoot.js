import { Fragment, useContext, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navigation/Navbar";
import SelectContext from "../store/select-context";

const NavbarRoot = (props) => {
  const ctx = useContext(SelectContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ctx.isLogIn) {
      navigate("/");
    }
  }, [ctx.isLogIn, navigate]);
  
  return (
    <Fragment>
      <Navbar onLogOut={props.onLogOut} />
      <Outlet />
    </Fragment>
  );
};

export default NavbarRoot;
