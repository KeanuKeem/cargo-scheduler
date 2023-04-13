import { useContext, useState } from "react";
import ShipmentEdit from "./ShipmentEdit";
import SelectContext from "../../store/select-context";
import { deleteShipment } from "../Reference/AddShipment";

import Shipment from "./Shipment";

import "./Shipment.css";
import "./ShipmentFAK.css";
import ShipmentForm from "./ShipmentForm";
import axios from "axios";

const ShipmentFAK = (props) => {
  const ctx = useContext(SelectContext);

  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [shipmentData, setShipmentData] = useState([]);
  const [mId, setMId] = useState(props.data.ref);

  const editBtnHandler = () => {
    setIsEdit(true);
  };

  const AddBtnHandler = () => {
    setIsAdd(!isAdd);
  };

  const shipmentClickHandler = async (event) => {
    event.preventDefault();

    props.showBackBtn();

    const response = await axios.get(
      `http://localhost:5000/api/shipment/?id=${event.target.id}`
    );
    setShipmentData(response.data);
    props.onFakChange();
  };

  const onAddShipment = async (event) => {
    event.preventDefault();

    const shipment = {
      ref: event.target.ref.value,
      cargoType: props.data.cargoType,
      contType: "LCLFAK",
      schedule: props.data.schedule,
      port: props.data.port,
      vessel: props.data.vessel,
      voyage: props.data.voyage,
      mblNumber: props.data.mbl.number,
      hblNumber: event.target.hbl.value,
      container: props.data.container,
      depot: props.data.depot,
      notes: event.target.notes.value,
      stepOne: event.target.stepOne.checked,
      stepTwo: event.target.stepTwo.checked,
      stepThree: event.target.stepThree.checked,
      stepFour: event.target.stepFour.checked,
      stepFive: event.target.stepFive.checked,
      stepSix: event.target.stepSix.checked,
      stepSeven: event.target.stepSeven.checked,
    };

    Promise.all([
      await axios.post(
        `http://localhost:5000/api/shipment/inFak?id=${props.data.ref}`,
        shipment
      ),
      await axios.post("http://localhost:5000/api/shipment/", shipment),
    ]).catch((err) => {
      console.log(err);
    });

    props.onShipmentAdd(true);
    setIsAdd(!isAdd);
  };

  const deleteFakShipmentHandler = async () => {
    Promise.all([
      await axios.delete(
        `http://localhost:5000/api/shipment/fak?id=${props.data.ref}`
      ),
      await axios.delete(
        `http://localhost:5000/api/shipment?id=${props.data.ref}`
      ),
    ]).catch(err => {
      console.log(err);
    });
    
    props.onDataEdit(true);
    props.onClose();
  };


  if (isEdit) {
    return (
      <ShipmentEdit
        onCancel={editBtnHandler}
        onClose={props.onClose}
        data={props.data}
        onDataEdit={props.onDataEdit}
      />
    );
  }
  if (isAdd) {
    return (
      <ShipmentForm
        onFakAdd={onAddShipment}
        shipmentType={props.data.cargoType}
        sendFrom="FAK"
      />
    );
  }
  if (props.showFakShipment) {
    return (
      <Shipment
        onClose={props.onClose}
        onBack={props.onBack}
        onDataEdit={props.onDataEdit}
        filteredData={shipmentData}
        mId={mId}
      />
    );
  } else {
    return (
      <>
        <div className="shipment__top-menu">
          <ul className="shipment__top-menu-list">
            <li>
              <h1>{props.data.ref}</h1>
            </li>
            <li>
              <p>{props.data.cargoType}</p>
            </li>
            <li>
              <p>{props.data.contType}</p>
            </li>
            <li>
              <p>{`${props.data.schedule.slice(
                8,
                10
              )}/${props.data.schedule.slice(5, 7)}/${props.data.schedule.slice(
                0,
                4
              )}`}</p>
            </li>
            <li>
              <span>
                <p>MBL Surrendered: </p>
                <input
                  type="checkbox"
                  // onChange={checklistMblHandler}
                  // defaultChecked={checklistState.isMblSurr}
                />
              </span>
            </li>
            {/* {saveBtnShow && (
              <li>
                <button className="shipment__top-menu-list__btn" type="submit">
                  Save
                </button>
              </li>
            )} */}
          </ul>
          <div className="shipment__detail">
            <div className="shipment__left">
              <div className="shipment__left__label">
                <p>Place of Discharge: </p>
                <p>MBL: </p>
                <p>Container Number: </p>
                <p>Vessel: </p>
                <p>Available Depot: </p>
              </div>
              <div className="shipment__left__input">
                <p>{props.data.port}</p>

                <p>{props.data.mbl.number}</p>

                <p>{props.data.container}</p>
                <p>{`${props.data.vessel} ${props.data.voyage}`}</p>
                <p>{props.data.depot}</p>
              </div>
              <div className="shipment__left__notes">
                <span className="notes-label">Notes: </span>
                <p>{props.data.notes}</p>
              </div>
            </div>
            <div className="shipment__right">
              <div className="shipment__right__box">
                <div className="shipment__right__box-top">
                  <p>Shipments:</p>
                  {!isAdd && <button onClick={AddBtnHandler}>+</button>}
                </div>
                <div className="shipmentFAK__right__box-bottom">
                  <ul>
                    {props.data.fakShipments.map((shipment) => {
                      return (
                        <li key={shipment.ref}>
                          <p onClick={shipmentClickHandler} id={shipment.ref}>
                            {shipment.ref}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shipment__bottom">
          <button onClick={editBtnHandler}>Edit</button>
          <button onClick={deleteFakShipmentHandler}>Delete</button>
        </div>
      </>
    );
  }
};

export default ShipmentFAK;
