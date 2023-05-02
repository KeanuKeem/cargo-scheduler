import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReactDOM from "react-dom";

import Shipment from "./Shipment";
import ShipmentFAK from "./ShipmentFAK";
import Loading from "../../pages/Loading";

import SelectContext from "../../store/select-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

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
        {props.isLoading && <Loading />}
        <div className="modal__top-bar">
          {showBackBtn && (
            <FontAwesomeIcon
              className="modal__top-bar__back"
              onClick={backBtnClickHandler}
              icon={faCircleChevronLeft}
            />
          )}
          <FontAwesomeIcon
            className="modal__top-bar__exit"
            icon={faCircleXmark}
            onClick={props.onClose}
          />
        </div>
        <div className="modal__contents">
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
      </div>
    );
  }

  return (
    <div className="modal">
      {props.isLoading && <Loading />}
      <div className="modal__top-bar">
        <FontAwesomeIcon
          className="modal__top-bar__exit"
          icon={faCircleXmark}
          onClick={props.onClose}
        />
      </div>
      <div className="modal__contents">
        {Object.keys(props.filteredData).length > 0 && (
          <Shipment
            filteredData={props.filteredData}
            onDataEdit={props.onDataEdit}
            onClose={props.onClose}
          />
        )}
      </div>
    </div>
  );
};

const ShipmentModal = (props) => {
  const ctx = useContext(SelectContext);
  const [filteredData, setFilteredData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const id = props.modalValue.id.split("+")[1];

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/shipment/?id=${id}`,
        { headers: { Authorization: "Bearer " + ctx.token } }
      );
      setIsLoading(false);
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
          isLoading={isLoading}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default ShipmentModal;
