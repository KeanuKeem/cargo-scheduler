import TypeSelector from "../Calendar/Select/TypeSelector";
import DetailForm from "./DetailForm";

import "./ShipmentForm.css";

const ShipmentForm = (props) => {
  const important = "(*) parts cannot be empty!";

  return (
    <div className="shipment">
      <h2>Add a shipment</h2>
      <p>Please select which type of cargo you are handling!</p>
      <p>{important}</p>
      {props.error !== "" && <p className="shipment__error">{props.error}</p>}

      <div className="shipment__type">
        <div className="shipment__type-selector">
          <label>*Cargo Type:</label>
          <TypeSelector
            type="cargoType"
            default={props.shipmentType}
            typeHandler={props.shipmentSet}
          />
        </div>
        <div className="shipment__type-selector">
          <label>*Container Type:</label>
          <TypeSelector
            type={props.sendFrom}
            typeHandler={props.contSet}
            default={props.contTypeState.value}
          />
        </div>
      </div>

      {props.shipmentType !== "Select cargo type" &&
        props.contTypeState.value !== "" && (
          <DetailForm
            onFakAdd={props.onFakAdd}
            eta={props.eta}
            sendFrom={props.sendFrom}
            onClose={props.onClose}
            shipmentType={props.shipmentType}
            contTypeState={props.contTypeState}
          />
        )}
    </div>
  );
};

export default ShipmentForm;
