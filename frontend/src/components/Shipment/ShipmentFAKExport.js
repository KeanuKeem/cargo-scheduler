import { useContext, useState } from "react";
import SelectContext from "../../store/select-context";
import { deleteShipment } from "../Reference/AddShipment";


import "./Shipment.css";
import "./ShipmentFAK.css";
import ShipmentForm from "./ShipmentForm";
import ShipmentExport from "./ShipmentExport";
import ShipmentEditExport from "./ShipmentEditExport";

const ShipmentFAK = (props) => {
  const ctx = useContext(SelectContext);

  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [shipmentId, setShipmentId] = useState();

  const editBtnHandler = () => {
    setIsEdit(true);
  };

  const AddBtnHandler = () => {
    setIsAdd(!isAdd);
  };

  const shipmentClickHandler = (event) => {
    props.showBackBtn();
    setShipmentId(event.target.id);
    props.onFakChange();
  };

  const onAddShipment = (event) => {
    event.preventDefault();

    props.data.fakShipments.push({
      id: event.target.ref.value,
      mId: props.data.id,
      type: props.data.type,
      contType: "LCLFAK",
      cutoff: props.data.cutoff,
      pol: props.data.pol,
      vessel: props.data.vessel,
      voyage: props.data.voyage,
      mbl: {
        number: props.data.mbl.number,
        isMblSurr: false,
        surrDate: "",
      },
      hbl: {
        number: event.target.hbl.value,
        isHblSurr: false,
        surrDate: "",
      },
      container: props.data.container,
      depot: props.data.depot,
      notes: event.target.note.value,
      bc: {
        isBc: event.target.an.checked,
        bcDone: false,
        bcDate: "",
      },
      inv: {
        isInv: event.target.inv.checked,
        invDone: false,
        invDate: "",
      },
      bl: {
        isBl: event.target.do.checked,
        blDone: false,
        blDate: "",
      },
      checkIn: {
        isCheckIn: event.target.outturn.checked,
        checkInDone: false,
        checkInDate: "",
      },
      cclr: {
        isCclr: event.target.cclr.checked,
        cclrDone: false,
        cclrDate: "",
      },
      del: {
        isDel: event.target.del.checked,
        delDone: false,
        delDate: "",
      },
      str: {
        isStr: event.target.str.checked,
        strStarted: false,
        strDone: false,
        strDateStart: "",
        strDateEnd: "",
      },
    });
    setIsAdd(!isAdd);
  };

  const fakShipments = props.data.fakShipments.filter(
    (shipment) => shipment.id === shipmentId
  );

  const deleteBtnHandler = () => {
    deleteShipment(ctx.data, props.data);
    props.onClose();
  };

  if (isEdit) {
    return (
      <ShipmentEditExport
        onCancel={editBtnHandler}
        onClose={props.onClose}
        data={props.data}
      />
    );
  }
  if (isAdd) {
    return (
      <ShipmentForm
        onFakAdd={onAddShipment}
        shipmentType={props.data.type}
        sendFrom="FAK"
      />
    );
  }
  if (props.showFakShipment) {
    return <ShipmentExport data={fakShipments[0]} />;
  } else {
    return (
      <>
        <div className="shipment__top-menu">
          <ul className="shipment__top-menu-list">
            <li>
              <h1>{props.data.id}</h1>
            </li>
            <li>
              <p>{props.data.type}</p>
            </li>
            <li>
              <p>{props.data.contType}</p>
            </li>
            <li>
              <p>{`${props.data.cutoff.slice(8, 10)}/${props.data.cutoff.slice(
                5,
                7
              )}/${props.data.cutoff.slice(0, 4)}`}</p>
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
                <p>{props.data.pol}</p>

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
                        <li key={shipment.id}>
                          <p onClick={shipmentClickHandler} id={shipment.id}>
                            {shipment.id}
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
          <button onClick={deleteBtnHandler}>Delete</button>
        </div>
      </>
    );
  }
};

export default ShipmentFAK;
