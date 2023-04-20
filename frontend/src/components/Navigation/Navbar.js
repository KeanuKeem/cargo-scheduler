// React
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import Profile from "./Profile";

// CSS
import "./Navbar.css";

// -----Navbar-Components----- //
const Navbar = (props) => {
  const [onProfile, setOnProfile] = useState(false);

  const profileHandler = () => {
    setOnProfile(!onProfile);
  };

  return (
    <>
      <div className="navbar">
        <h1 className="navbar__logo">Cargo Scheduler</h1>
        <div className="navbar__menu">
          <button>Calendar</button>
          <button>ToDo</button>
        </div>
        <div className="navbar__profile" onClick={profileHandler}>
          <FontAwesomeIcon
            icon={faUser}
            size="lg"
            style={{ color: "#7868E6" }}
          />
        </div>
      </div>
      {onProfile && <Profile onLogOut={props.onLogOut} />}
    </>
  );
};

export default Navbar;
