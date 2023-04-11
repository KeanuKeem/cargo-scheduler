import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReactDOM from "react-dom";

import Shipment from "./Shipment";
import ShipmentFAK from "./ShipmentFAK";

import SelectContext from "../../store/select-context";

import "./ShipmentModal.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  const [showBackBtn, setShowBackBtn] = useState(false);
  const [isFakShipment, setIsFakShipment] = useState(false);

  const backBtnShowHandler = () => {
    setShowBackBtn(!showBackBtn);
  };

  const fakShipmentShowHandler = () => {
    setIsFakShipment(!isFakShipment);
  };

  const backBtnClickHandler = () => {
    setShowBackBtn(!showBackBtn);
    setIsFakShipment(!isFakShipment);
  };

  if (props.filteredData.contType === "FAK") {
    return (
      <div className="modal">
        <div className="modal__top-bar">
          {showBackBtn && (
            <button
              className="modal__top-bar__back"
              onClick={backBtnClickHandler}
            >
              Back
            </button>
          )}
          <button className="modal__top-bar__exit">X</button>
        </div>
        {Object.keys(props.filteredData).length > 0 && (
          <ShipmentFAK
            data={props.filteredData}
            onClose={props.onClose}
            showBackBtn={backBtnShowHandler}
            showFakShipment={isFakShipment}
            onFakChange={fakShipmentShowHandler}
            onDataEdit={props.onDataEdit}
            onShipmentAdd={props.onShipmentAdd}
            onBack={backBtnClickHandler}
          />
        )}
      </div>
    );
  }

  return (
    <div className="modal">
      <div className="modal__top-bar">
        <button className="modal__top-bar__exit">X</button>
      </div>
      {Object.keys(props.filteredData).length > 0 && (
        <Shipment
          filteredData={props.filteredData}
          onDataEdit={props.onDataEdit}
          onClose={props.onClose}
        />
      )}
    </div>
  );
};

const ShipmentModal = (props) => {
  const ctx = useContext(SelectContext);
  const [filteredData, setFilteredData] = useState({});

  const id = props.modalValue.id.split("+")[1];

  console.log(id);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shipment/?id=${id}`
      );
      setFilteredData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.isShipementClicked, props.shipmentAdded, props.dataEdited]);

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          filteredData={filteredData}
          onClose={props.onClose}
          onDataEdit={props.onDataEdit}
          onShipmentAdd={props.onShipmentAdd}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default ShipmentModal;
