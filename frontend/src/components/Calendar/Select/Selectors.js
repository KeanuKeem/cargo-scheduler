// React
import { useState } from "react";

// Components
import MonthSelector from "./MonthSelector";
import TypeSelector from "./TypeSelector";
import YearSelector from "./YearSelector";

// CSS
import "./Selectors.css";

// -----Selectors-Components----- //
const Selectors = (props) => {
  console.log(props.data);

  const [vesselName, setVesselName] = useState("Vessel Name");
  const [vesselDate, setVesselDate] = useState();
  const [isVessel, setIsVessel] = useState(false);

  const scheduleUpdaterHandler = () => {
    setIsVessel(!isVessel);
  };

  return (
    <div className={!isVessel ? "selectors" : "selectors__open"}>
      <div className="selectors__left">
        <TypeSelector type="get" />
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
          <button onClick={scheduleUpdaterHandler}>
            Vessel Schedule Update
          </button>
        </div>
      ) : (
        <>
          <div className="selectors__vessel">
            <button onClick={scheduleUpdaterHandler}>Close</button>
          </div>
          <div className="selectors__vessel__show">
            <form>
              <input type="text" placeholder="Vessel Name" />
              <input type="text" placeholder="Voyage" />
              <input type="date" />
              <button>Update</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Selectors;
