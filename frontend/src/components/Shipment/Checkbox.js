import "./Checkbox.css";

const Checkbox = (props) => {
  return (
    <div className="shipment__checkbox">
      <p>Handling checklist:</p>

      <div>
        <div className="shipment__checkbox-container">
          <label>
            {props.shipmentType === "Import"
              ? "Arrival Notice: "
              : "Booking Confirmation: "}
          </label>
          <input type="checkbox" name="stepOne" id="stepOne"></input>
        </div>
        <div className="shipment__checkbox-container">
          <label>Invoice:</label>
          <input type="checkbox" name="stepTwo" id="stepTwo"></input>
        </div>
        <div className="shipment__checkbox-container">
          <label>{props.shipmentType === "Import"
                  ? "Delivery Order: "
                  : "Bill of Lading: "}</label>
          <input type="checkbox" name="stepThree" id="stepThree"></input>
        </div>
        <div className="shipment__checkbox-container">
          <label>{props.shipmentType === "Import"
                  ? "Outturn Report: "
                  : "Check-in detail: "}</label>
          <input type="checkbox" name="stepFour" id="stepFour"></input>
        </div>
        <div className="shipment__checkbox-container">
          <label>Customs Clearance:</label>
          <input type="checkbox" name="stepFive" id="stepFive"></input>
        </div>
        <div className="shipment__checkbox-container">
          <label>Delivery:</label>
          <input type="checkbox" name="stepSix" id="stepSix"></input>
        </div>
        <div className="shipment__checkbox-container">
          <label>Storage:</label>
          <input type="checkbox" name="stepSeven" id="stepSeven"></input>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
