import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

import "./MenuTopBar.css";

const MenuTopBar = (props) => {
  return (
    <div className="top-bar">
      <div className="top-bar__btn">
        <FontAwesomeIcon
          className="top-bar__close"
          icon={faCircleXmark}
          onClick={props.onClose}
        />
        <FontAwesomeIcon
          className="top-bar__minimise"
          icon={faCircleMinus}
          onClick={props.onMinimise}
        />
      </div>
    </div>
  );
};

export default MenuTopBar;
