import { useContext, useEffect, useReducer, useState } from "react";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import Shipment from "./Shipment";
import ShipmentEdit from "./ShipmentEdit";
import ShipmentForm from "./ShipmentForm";
import ShipmentPopup from "./ShipmentPopup";

import SelectContext from "../../store/select-context";

import { makeChecklist } from "../Reference/AddShipment";
import { getToday } from "../Reference/Calendar";

import "./Shipment.css";
import "./ShipmentFAK.css";

const checklistReducer = (state, action) => {
  if (action.type === "MBL") {
    return {
      isMblSurr: action.isMblSurr,
      mblSurrDate: action.mblSurrDate,
      isHold: state.isHold,
      isDtr: state.isDtr,
      dtrDate: state.dtrDate,
    };
  }
  if (action.type === "HOLD") {
    return {
      isMblSurr: state.isMblSurr,
      mblSurrDate: state.mblSurrDate,
      isHold: action.isHold,
      isDtr: state.isDtr,
      dtrDate: state.dtrDate,
    };
  }
  if (action.type === "DTR") {
    return {
      isMblSurr: state.isMblSurr,
      mblSurrDate: state.mblSurrDate,
      isHold: state.isHold,
      isDtr: action.isDtr,
      dtrDate: action.dtrDate,
    };
  }
};

const ShipmentFAK = (props) => {
  const ctx = useContext(SelectContext);
  const today = getToday();

  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [shipmentData, setShipmentData] = useState([]);
  const [mId, setMId] = useState(props.data.ref);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [isFavourite, setIsFavourite] = useState(props.data.favourite);
  const [isSave, setIsSave] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showMblSurr, setShowMblSurr] = useState(false);

  const [checklistState, dispatchChecklistState] = useReducer(
    checklistReducer,
    {
      isMblSurr: props.data.mbl.isSurr,
      mblSurrDate: props.data.mbl.date,
      isHold: props.data.isHold || false,
      isDtr: props.data.dtr.isDtr || false,
      dtrDate: props.data.dtr.date || "",
    }
  );

  const editBtnHandler = () => {
    setIsEdit(!isEdit);
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

  const mblSurrHandler = () => {
    dispatchChecklistState({
      type: "MBL",
      isMblSurr: !checklistState.isMblSurr,
      mblSurrDate: today,
    });
  };

  const holdHandler = () => {
    dispatchChecklistState({
      type: "HOLD",
      isHold: !checklistState.isHold,
    });
  };

  const dtrHandler = () => {
    dispatchChecklistState({
      type: "DTR",
      isDtr: !checklistState.isDtr,
      dtrDate: today,
    });
  };

  const shipmentClickHandler = async (event) => {
    event.preventDefault();

    props.showBackBtn();

    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + `/shipment/?id=${event.target.id}`,
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
      consoleId: props.data.ref,
      stepOne: event.target.stepOne.checked,
      stepTwo: event.target.stepTwo.checked,
      stepThree: event.target.stepThree.checked,
      stepFour: event.target.stepFour.checked,
      stepFive: event.target.stepFive.checked,
      stepSix: event.target.stepSix.checked,
      stepSeven: event.target.stepSeven.checked,
    };

    await axios
      .post(process.env.REACT_APP_BACKEND_URL + "/shipment/inFak", shipment, {
        headers: { Authorization: "Bearer " + ctx.token },
      })
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
      .delete(
        process.env.REACT_APP_BACKEND_URL +
          `/shipment/fak?id=${props.data.ref}`,
        {
          headers: { Authorization: "Bearer " + ctx.token },
        }
      )
      .catch((err) => {
        console.log(err);
      });

    props.onDataEdit(true);
    props.onClose();
  };

  const saveFakHandler = async () => {
    const shipment = makeChecklist(
      props.data.ref,
      props.data.contType,
      checklistState,
      isFavourite
    );
    await axios
      .patch(
        process.env.REACT_APP_BACKEND_URL + "/shipment/checklist",
        shipment,
        {
          headers: { Authorization: "Bearer " + ctx.token },
        }
      )
      .then((result) => {
        setIsSave(false);
        setIsPopup(true);
        setPopupMessage(result.data);
      })
      .catch((err) => {
        setIsSave(false);
        setIsPopup(true);
        setPopupMessage(err.response.data);
      });
    props.onDataEdit(true);
  };

  useEffect(() => {
    if (
      props.data.mbl.isSurr !== checklistState.isMblSurr ||
      props.data.favourite !== isFavourite ||
      props.data.isHold !== checklistState.isHold ||
      props.data.dtr.isDtr !== checklistState.isDtr
    ) {
      setIsSave(true);
    } else {
      setIsSave(false);
    }
  }, [props.data, checklistState, isFavourite]);

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
        onClose={() => {
          setIsAdd(false);
        }}
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
        {isPopup && (
          <ShipmentPopup
            type="notification"
            text={popupMessage}
            button="Okay!"
            onClick={() => {
              setIsPopup(false);
            }}
          />
        )}

        <div className="shipment__top-menu">
          <ul className="shipment__top-menu-list">
            <li>
              <h1 className="shipment__id">{props.data.ref}</h1>
            </li>
            <li>
              <p>
                {isFavourite ? (
                  <FontAwesomeIcon
                    className="shipment__favourite"
                    icon={faStar}
                    onClick={() => {
                      setIsFavourite(false);
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="shipment__no-favourite"
                    icon={faStar}
                    onClick={() => {
                      setIsFavourite(true);
                    }}
                  />
                )}
              </p>
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
              <div className="shipment__mbl">
                <span>
                  <p
                    onMouseEnter={() => {
                      setShowMblSurr(true);
                    }}
                    onMouseLeave={() => {
                      setShowMblSurr(false);
                    }}
                  >
                    MBL Surrendered:{" "}
                  </p>
                  <input
                    type="checkbox"
                    onChange={mblSurrHandler}
                    defaultChecked={checklistState.isMblSurr}
                  />
                </span>
                {props.data.mbl.isSurr && showMblSurr && (
                  <div className="shipment__mbl__show">
                    <p>MBL Surrendered on: {props.data.mbl.date}</p>
                  </div>
                )}
              </div>
            </li>
            <li>
              <div className="shipment__hold">
                <span>
                  <p>Shipment on Hold: </p>
                  <input
                    type="checkbox"
                    onChange={holdHandler}
                    defaultChecked={checklistState.isHold}
                  />
                </span>
              </div>
            </li>
            {isSave && (
              <li>
                <button
                  className="shipment__top-menu-list__btn"
                  onClick={saveFakHandler}
                >
                  Save
                </button>
              </li>
            )}
          </ul>
          <div className="shipment__detail">
            <div className="shipment__left">
              <div className="shipment__left__sm__items">
                <p
                  onMouseEnter={() => {
                    setShowMblSurr(true);
                  }}
                  onMouseLeave={() => {
                    setShowMblSurr(false);
                  }}
                >
                  MBL Surrendered:{" "}
                </p>
                <input
                  type="checkbox"
                  onChange={mblSurrHandler}
                  defaultChecked={checklistState.isMblSurr}
                />
              </div>
              <div className="shipment__left__sm-hold__items">
                <p>Shipment on Hold: </p>
                <input
                  type="checkbox"
                  onChange={holdHandler}
                  defaultChecked={checklistState.isHold}
                />
              </div>
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
              <div className="shipment__left__items">
                <p>
                  Domestic Transfer Request:
                  <input
                    type="checkbox"
                    onChange={dtrHandler}
                    defaultChecked={checklistState.isDtr}
                  />
                </p>
                <p>{props.data.dtr.isDtr ? props.data.dtr.date : ""}</p>
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
                  {!isAdd && (
                    <button className="addBtn" onClick={AddBtnHandler}>
                      +
                    </button>
                  )}
                </div>
                <div className="shipmentFAK__right__box-bottom">
                  <div className="shipmentFAK__right__box-bottom__list">
                    {props.data.fakShipments.map((shipment) => {
                      return (
                        <p
                          key={shipment.ref}
                          style={{
                            color: shipment.font,
                            backgroundColor: shipment.back,
                          }}
                          onClick={shipmentClickHandler}
                          id={shipment.ref}
                        >
                          {shipment.isHold && (
                            <>
                              <span>
                                <FontAwesomeIcon icon={faCircleExclamation} />
                              </span>{" "}
                            </>
                          )}
                          {shipment.ref}
                        </p>
                      );
                    })}
                  </div>
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
