import { useContext, useState } from "react";
import ShipmentEdit from "./ShipmentEdit";
import SelectContext from "../../store/select-context";
import { deleteShipment } from "../Reference/AddShipment";

import Shipment from "./Shipment";

import "./Shipment.css";
import "./ShipmentFAK.css";
import ShipmentForm from "./ShipmentForm";
import axios from "axios";
import ShipmentPopup from "./ShipmentPopup";

const ShipmentFAK = (props) => {
  const ctx = useContext(SelectContext);

  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [shipmentData, setShipmentData] = useState([]);
  const [mId, setMId] = useState(props.data.ref);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const editBtnHandler = () => {
    setIsEdit(true);
  };

  const AddBtnHandler = () => {
    setIsAdd(!isAdd);
  };

  const deleteBtnClickHandler = () => {
    setIsDelete(true);
  };

  const noBtnClickHandler = () => {
    setIsDelete(false);
  };

  const shipmentClickHandler = async (event) => {
    event.preventDefault();

    props.showBackBtn();

    const response = await axios.get(
      `http://localhost:5000/api/shipment/?id=${event.target.id}`,
      { headers: { Authorization: "Bearer " + ctx.token } }
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

    await axios
      .post(
        `http://localhost:5000/api/shipment/inFak?id=${props.data.ref}`,
        shipment,
        { headers: { Authorization: "Bearer " + ctx.token } }
      )
      .then(() => {
        props.onShipmentAdd(true);
        setIsAdd(!isAdd);
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
      });
  };

  const deleteFakShipmentHandler = async () => {
    await axios
      .delete(`http://localhost:5000/api/shipment/fak?id=${props.data.ref}`, {
        headers: { Authorization: "Bearer " + ctx.token },
      })

      .catch((err) => {
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
        error={errorMessage}
        shipmentType={props.data.cargoType}
        contTypeState={{ value: props.data.contType }}
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
        {isDelete && (
          <ShipmentPopup
            type="select"
            text="Would you really wish to delete this shipment?"
            buttonOne="Yes"
            buttonTwo="No"
            onClickOne={deleteFakShipmentHandler}
            onClickTwo={noBtnClickHandler}
          />
        )}

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
              <div className="shipment__left__items">
                <p>Place of Discharge: </p>
                <p>{props.data.port}</p>
              </div>
              <div className="shipment__left__items">
                <p>MBL: </p>
                <p>{props.data.mbl.number}</p>
              </div>
              <div className="shipment__left__items">
                <p>Container Number: </p>
                <p>{props.data.container}</p>
              </div>
              <div className="shipment__left__items">
                <p>Vessel: </p>
                <p>{`${props.data.vessel} ${props.data.voyage}`}</p>
              </div>
              <div className="shipment__left__items">
                <p>Available Depot: </p>
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
          <button onClick={deleteBtnClickHandler}>Delete</button>
        </div>
      </>
    );
  }
};

export default ShipmentFAK;
