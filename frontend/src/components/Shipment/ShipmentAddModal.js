import React, { useState, useReducer, useContext } from "react";
import axios from "axios";
import ReactDOM from "react-dom";

import ShipmentForm from "./ShipmentForm";

import SelectContext from "../../store/select-context";
import ShipmentContext from "../../store/shipment-context";
import { makeShipment } from "../Reference/AddShipment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./ShipmentModal.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="modal__top-bar">
        <FontAwesomeIcon
          className="modal__top-bar__exit"
          icon={faCircleXmark}
          onClick={props.onClose}
        />
      </div>
      <div className="modal__contents">
        <ShipmentForm
          shipmentType={props.shipmentType}
          shipmentSet={props.shipmentSet}
          contTypeState={props.contTypeState}
          contSet={props.contSet}
          sendFrom="add"
          onClose={props.onClose}
          error={props.error}
        />
      </div>
    </div>
  );
};

const contTypeReducer = (state, action) => {
  if (action.type === "FAK") {
    return {
      type: action.type,
      value: action.type,
      toShowMbl: true,
      toShowHbl: false,
      toShowVoyage: true,
      toShowChecklist: false,
    };
  }
  if (action.type === "AIR") {
    return {
      type: action.type,
      value: action.type,
      toShowMbl: true,
      toShowHbl: true,
      toShowVoyage: false,
      toShowChecklist: true,
    };
  }
  if (action.type !== "BKR") {
    return {
      type: action.type,
      value: action.type,
      toShowMbl: true,
      toShowHbl: true,
      toShowVoyage: true,
      toShowChecklist: true,
    };
  }
  return {
    type: action.type,
    value: action.type,
    toShowMbl: false,
    toShowHbl: true,
    toShowVoyage: true,
    toShowChecklist: true,
  };
};

const ShipmentAddModal = (props) => {
  const ctx = useContext(SelectContext);
  const [shipmentType, setShipmentType] = useState("Select cargo type");
  const [error, setError] = useState("");

  const [contTypeState, dispatchContType] = useReducer(contTypeReducer, {
    type: "",
    value: "",
    toShowMbl: false,
    toShowHbl: false,
    toShowVoyage: false,
    toShowChecklist: false,
  });

  const contTypeHandler = (event) => {
    const typeVal = event.target.value;
    dispatchContType({
      type: typeVal,
    });
  };

  const typeHandler = (event) => {
    setShipmentType(event.target.value);
  };

  const formHandler = async (event) => {
    event.preventDefault();
    const shipment = makeShipment(event, shipmentType, contTypeState.value);

    await axios
      .post(process.env.REACT_APP_BACKEND_URL + "/shipment/", shipment, {
        headers: { Authorization: "Bearer " + ctx.token },
      })
      .then((result) => {
        if (result.status === 200) {
          props.onDataAdd(true);
          props.onClose();
        }
      })
      .catch((err) => {
        setError(err.response.data);
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
          contTypeState={contTypeState}
          contSet={contTypeHandler}
          onClose={props.onClose}
          error={error}
        />,
        document.getElementById("overlay-root")
      )}
    </ShipmentContext.Provider>
  );
};

export default ShipmentAddModal;
