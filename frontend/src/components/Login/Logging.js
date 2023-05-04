import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import "./Logging.css";

const Logging = (props) => {
  return (
    <div className="logging">
      <p>{props.text}</p>
      <span>
        <FontAwesomeIcon icon={faSpinner} />
      </span>
    </div>
  );
};

export default Logging;
