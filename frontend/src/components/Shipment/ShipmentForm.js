import TypeSelector from "../Calendar/Select/TypeSelector";
import DetailForm from "./DetailForm";

import "./ShipmentForm.css";

const ShipmentForm = (props) => {
  return (
    <div className="shipment">
      <h2>Add a shipment</h2>
      <p>Please select which type of cargo you are handling!</p>

      <label className="shipment__type">Cargo Type:</label>
      <TypeSelector
        type="cargoType"
        default={props.shipmentType}
        typeHandler={props.shipmentSet}
      />

      {props.shipmentType !== "Select cargo type" && (
        <DetailForm
          onFakAdd={props.onFakAdd}
          eta={props.eta}
          sendFrom={props.sendFrom}
          onClose={props.onClose}
          shipmentType={props.shipmentType}
        />
      )}
    </div>
  );
};

export default ShipmentForm;
