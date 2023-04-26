// React
import { useState, useRef, createContext, useContext } from "react";

// Context
import SelectContext from "../../../store/select-context";

// Components
import MonthSelector from "./MonthSelector";
import TypeSelector from "./TypeSelector";
import YearSelector from "./YearSelector";
import ShipmentPopup from "../../Shipment/ShipmentPopup";
import SelectBtn from "./SelectBtn";

// CSS
import "./Selectors.css";
import axios from "axios";


// -----Selectors-Components----- //
const Selectors = (props) => {
  const ctx = useContext(SelectContext);
  const vesselRef = useRef();
  const voyageRef = useRef();
  const newScheduleRef = useRef();
  const [isVessel, setIsVessel] = useState(false);
  const [type, setType] = useState("All");
  const [isPopup, setIsPopup] = useState(false);
  const [isError, setIsError] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const updateScheduleBtnHandler = () => {
    setIsVessel(!isVessel);
  };

  const notificationBtnHandler = () => {
    if (isError) {
      setIsPopup(false);
    } else {
      setIsPopup(false);
      setIsVessel(false);
    }
  };

  const updateScheduleHandler = async (event) => {
    event.preventDefault();

    const detail = {
      vessel: vesselRef.current.value,
      voyage: voyageRef.current.value,
      newSchedule: newScheduleRef.current.value,
      type,
    };

    await axios
      .patch("http://localhost:5000/api/shipment/vessel", detail, {
        headers: { Authorization: "Bearer " + ctx.token },
      })
      .then((result) => {
        setPopupMessage(result.data);
        setIsPopup(true);
        props.onDataEdit(true);
      })
      .catch((err) => {
        setPopupMessage(err.response.data);
        setIsError(true);
        setIsPopup(true);
      });
  };

  return (
    <>
      {isPopup && <ShipmentPopup type="notification" text={popupMessage} button="Okay!" onClick={notificationBtnHandler} />}
      <div className={!isVessel ? "selectors" : "selectors__open"}>
        <div className="selectors__left">
          <TypeSelector onChange={props.onSort} type="get" />
        </div>
        <div className="selectors__center">
          <MonthSelector className="selectors__center-margin" />
          <YearSelector />
        </div>
        <div className="selectors__right">
          <SelectBtn onClick={props.onAddBtnClicked}>
            ADD
          </SelectBtn>
        </div>
        {!isVessel ? (
          <div className="selectors__vessel">
            <SelectBtn onClick={updateScheduleBtnHandler}>
              Vessel Schedule Update
            </SelectBtn>
          </div>
        ) : (
          <>
            <div className="selectors__vessel">
              <button className="btn" onClick={updateScheduleBtnHandler}>
                Close
              </button>
            </div>
            <div className="selectors__vessel__show">
              <form onSubmit={updateScheduleHandler}>
                <TypeSelector type="get" onChange={setType} />
                <input
                  className="selectos__vessel__vessel"
                  type="text"
                  ref={vesselRef}
                  placeholder="Vessel Name"
                />
                <input type="text" ref={voyageRef} placeholder="Voyage" />
                <input type="date" ref={newScheduleRef} />
                <button className="btn" type="submit">
                  Update
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Selectors;
