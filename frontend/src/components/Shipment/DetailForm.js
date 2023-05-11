import { useContext } from "react";
import Checkbox from "./Checkbox";
import "./ImportForm.css";
import ShipmentContext from "../../store/shipment-context";

const DetailForm = (props) => {
  const ctxForm = useContext(ShipmentContext);

  return (
    <form
      className="import-form"
      onSubmit={props.sendFrom === "FAK" ? props.onFakAdd : ctxForm.formHandler}
    >
      <label className="import-form__one-col" htmlFor="ref">
        *Reference Number:
      </label>
      <input
        className="import-form__one-col__input"
        type="text"
        name="ref"
        id="ref"
      />

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
                  ? "*Estimated Time of Arrival (ETA): "
                  : "*Cut-off Date: "}
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
              {props.contTypeState.type === "AIR" ? (
                <label htmlFor="vessel">*Flight:</label>
              ) : (
                <label htmlFor="vessel">*Vessel:</label>
              )}
              <input type="text" name="vessel" id="vessel" />

              {props.contTypeState.type !== "AIR" && (
                <>
                  <label>*Container Number#</label>
                  <input type="text" name="container" id="container" />
                </>
              )}

              <label>
                {props.shipmentType === "Import"
                  ? "*Available Depot: "
                  : "*Exporting Depot: "}
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
                  ? "*Place of discharge (POD): "
                  : "*Place of loading (POL): "}
              </label>
              <input type="text" name="port" id="port" />

              {props.contTypeState.toShowVoyage && (
                <label htmlFor="voyage">*Voyage:</label>
              )}
              {props.contTypeState.toShowVoyage && (
                <input type="text" name="voyage" id="voyage" />
              )}
            </>
          )}

          {props.contTypeState.toShowMbl && <label>MBL Number#</label>}
          {props.contTypeState.toShowMbl && (
            <input type="text" name="mbl" id="mbl" />
          )}

          {props.contTypeState.toShowHbl && <label>HBL Number#</label>}
          {props.contTypeState.toShowHbl && (
            <input type="text" name="hbl" id="hbl" />
          )}
        </div>
      </div>

      <label className="import-form__one-col">notes:</label>
      <textarea
        className="import-form__one-col__input"
        id="notes"
        name="notes"
        rows="5"
      />

      {props.contTypeState.toShowChecklist || props.sendFrom === "FAK" ? (
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
