// React
import { useState, useRef } from "react";

// Components
import MonthSelector from "./MonthSelector";
import TypeSelector from "./TypeSelector";
import YearSelector from "./YearSelector";

// CSS
import "./Selectors.css";
import axios from "axios";

// -----Selectors-Components----- //
const Selectors = (props) => {
  console.log(props.data);

  const vesselRef = useRef();
  const voyageRef = useRef();
  const newScheduleRef = useRef();
  const [isVessel, setIsVessel] = useState(false);
  const [type, setType] = useState("All");

  const updateScheduleBtnHandler = () => {
    setIsVessel(!isVessel);
  };

  const typeChangeHandler = (event) => {
    setType(event.target.value);
  };

  const updateScheduleHandler = async (event) => {
    event.preventDefault();

    const detail = {
      vessel: vesselRef.current.value,
      voyage: voyageRef.current.value,
      newSchedule: newScheduleRef.current.value,
      type
    };

    await axios.patch(
      "http://localhost:5000/api/shipment/vessel",
      [detail]
    );

    props.onDataEdit(true);

    setIsVessel(false);
  };

  return (
    <div className={!isVessel ? "selectors" : "selectors__open"}>
      <div className="selectors__left">
        <TypeSelector onChange={props.onSort} type="get" />
      </div>
      <div className="selectors__center">
        <MonthSelector className="selectors__center-margin" />
        <YearSelector />
      </div>
      <div className="selectors__right">
        <button onClick={props.onAddBtnClicked}>ADD</button>
      </div>
      {!isVessel ? (
        <div className="selectors__vessel">
          <button onClick={updateScheduleBtnHandler}>
            Vessel Schedule Update
          </button>
        </div>
      ) : (
        <>
          <div className="selectors__vessel">
            <button onClick={updateScheduleBtnHandler}>Close</button>
          </div>
          <div className="selectors__vessel__show">
            <form onSubmit={updateScheduleHandler}>
              <TypeSelector type="get" onChange={typeChangeHandler} />
              <input type="text" ref={vesselRef} placeholder="Vessel Name" />
              <input type="text" ref={voyageRef} placeholder="Voyage" />
              <input type="date" ref={newScheduleRef} />
              <button type="submit">Update</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Selectors;
