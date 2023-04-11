import { useContext, useReducer } from "react";
import Checkbox from "./Checkbox";
import "./ImportForm.css";
import TypeSelector from "../Calendar/Select/TypeSelector";
import ShipmentContext from "../../store/shipment-context";

const contTypeReducer = (state, action) => {
  if (action.type === "FAK") {
    return {
      type: action.type,
      value: action.type,
      toShowMbl: true,
      toShowHbl: false,
      toShowChecklist: false,
    };
  }
  if (action.type === "FCL" || action.type === "LCL") {
    return {
      type: action.type,
      value: action.type,
      toShowMbl: true,
      toShowHbl: true,
      toShowChecklist: true,
    };
  }
  return {
    type: action.type,
    value: action.type,
    toShowMbl: false,
    toShowHbl: true,
    toShowChecklist: true,
  };
};

const DetailForm = (props) => {
  const ctxForm = useContext(ShipmentContext);

  const [contTypeState, dispatchContType] = useReducer(contTypeReducer, {
    type: "",
    value: "",
    toShowMbl: false,
    toShowHbl: false,
    toShowChecklist: false,
  });

  const typeHandler = (event) => {
    const typeVal = event.target.value;
    dispatchContType({
      type: typeVal,
    });
  };

  return (
    <form
      className="import-form"
      onSubmit={props.sendFrom === "FAK" ? props.onFakAdd : ctxForm.formHandler}
    >
      <label className="import-form__one-col" htmlFor="ref">
        Reference Number:
      </label>
      <input
        className="import-form__one-col__input"
        type="text"
        name="ref"
        id="ref"
      />
      {props.sendFrom !== "FAK" && (
        <>
          <label className="import-form__one-col" htmlFor="ref">
            Container Type:
          </label>
          <TypeSelector
            className="import-form__one-col__input"
            type={props.sendFrom}
            typeHandler={typeHandler}
            shipmentType={props.shipmentType}
            default={contTypeState.value}
          />
        </>
      )}

      <div className="import-form__two-cols">
        <div className="import-form__left">
          {props.sendFrom === "FAK" && (
            <>
              <label htmlFor="eta">HBL Number:</label>
              <input type="text" name="hbl" id="hbl" />
            </>
          )}

          {props.sendFrom !== "FAK" && (
            <>
              <label htmlFor="schedule">
                {props.shipmentType === "Import"
                  ? "Estimated Time of Arrival (ETA): "
                  : "Cut-off Date: "}
              </label>
              <input
                type="date"
                min="2023-01-01"
                name="schedule"
                id="schedule"
              />
            </>
          )}

          {props.sendFrom !== "FAK" && (
            <>
              <label htmlFor="vessel">Vessel:</label>
              <input type="text" name="vessel" id="vessel" />

              <label>Container Number#</label>
              <input type="text" name="container" id="container" />

              <label>
                {props.shipmentType === "Import"
                  ? "Available Depot: "
                  : "Exporting Depot: "}
              </label>
              <input type="text" name="depot" id="depot" />
            </>
          )}
        </div>

        <div className="import-form__right">
          {props.sendFrom !== "FAK" && (
            <>
              <label>
                {props.shipmentType === "Import"
                  ? "Place of discharge (POD): "
                  : "Place of loading (POL): "}
              </label>
              <input type="text" name="port" id="port" />

              <label htmlFor="voyage">Voyage:</label>
              <input type="text" name="voyage" id="voyage" />
            </>
          )}

          {contTypeState.toShowMbl && <label>MBL Number#</label>}
          {contTypeState.toShowMbl && <input type="text" name="mbl" id="mbl" />}

          {contTypeState.toShowHbl && <label>HBL Number#</label>}
          {contTypeState.toShowHbl && <input type="text" name="hbl" id="hbl" />}
        </div>
      </div>

      <label className="import-form__one-col">notes:</label>
      <textarea
        className="import-form__one-col__input"
        id="notes"
        name="notes"
        rows="5"
      />

      {contTypeState.toShowChecklist || props.sendFrom === "FAK" ? (
        <Checkbox shipmentType={props.shipmentType} />
      ) : (
        ""
      )}

      <div className="import-form__btn-container">
        <button type="submit">ADD</button>
        <button onClick={props.onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default DetailForm;
