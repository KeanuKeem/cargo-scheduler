import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import SelectContext from "../../store/select-context";

import "./Menubar.css";

const Menubar = (props) => {
  const ctx = useContext(SelectContext);
  const [menubarClass, setMenubarClass] = useState("menubar");

  const menubarCloser = () => {
    setMenubarClass("menubar-close");
    setTimeout(() => {
        setMenubarClass("menubar");
        props.setOnMenubar(false);
    }, 400);
  };

  return (
    <div className={menubarClass}>
      <div className="menubar__top">
        <FontAwesomeIcon
          onClick={menubarCloser}
          icon={faCircleXmark}
        />
      </div>
      <div className="menubar__list">
        <p className="menubar__list__item">
          <Link
            onClick={() => {
              props.setOnMenubar(false);
            }}
            to="/calendar"
          >
            Calendar
          </Link>
        </p>
        <p className="menubar__list__item">
          <Link
            onClick={() => {
              props.setOnMenubar(false);
            }}
            to="/todo"
          >
            ToDo
          </Link>
        </p>
        <p
          className="menubar__list__item"
          onClick={() => {
            props.setOnMenubar(false);
            ctx.setIsSidebar(true);
          }}
        >
          Favourites
        </p>
      </div>
    </div>
  );
};

export default Menubar;
