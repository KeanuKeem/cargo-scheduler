import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReactDOM from "react-dom";

import ShipmentForm from "./ShipmentForm";

import SelectContext from "../../store/select-context";
import ShipmentContext from "../../store/shipment-context";
import { makeShipment } from "../Reference/AddShipment";

import "./ShipmentModal.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="modal__top-bar">
        <button className="modal__top-bar__exit">X</button>
      </div>
      <ShipmentForm
        shipmentType={props.shipmentType}
        shipmentSet={props.shipmentSet}
        sendFrom="contType"
        onClose={props.onClose}
      />
    </div>
  );
};

const ShipmentAddModal = (props) => {
  const ctx = useContext(SelectContext);
  const [shipmentType, setShipmentType] = useState("Select cargo type");

  const typeHandler = (event) => {
    setShipmentType(event.target.value);
  };

  const formHandler = async (event) => {
    event.preventDefault();
    const shipment = makeShipment(event, shipmentType);

    await axios
      .post("http://localhost:5000/api/shipment/", shipment)
      .then((response) => {
        props.onDataAdd(true);
        props.onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ShipmentContext.Provider
      value={{
        formHandler: formHandler,
      }}
    >
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          shipmentType={shipmentType}
          shipmentSet={typeHandler}
          onClose={props.onClose}
        />,
        document.getElementById("overlay-root")
      )}
    </ShipmentContext.Provider>
  );
};

export default ShipmentAddModal;
