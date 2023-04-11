import { useContext, useState, useEffect, useReducer } from "react";
import ShipmentEditExport from "./ShipmentEditExport";
import SelectContext from "../../store/select-context";



import {
  deleteShipment,
  makeShipmentForChecklist,
  saveChecklist,
} from "../Reference/AddShipment";
import { getToday } from "../Reference/Calendar";

import "./Shipment.css";


const checklistReducer = (state, action) => {
  if (action.type === "BC") {
    return {
      isBc: action.isBc,
      bcValue: action.bcValue,
      isInv: state.isInv,
      invValue: state.invValue,
      isBl: state.isBl,
      blValue: state.blValue,
      isCheckIn: state.isCheckIn,
      checkInValue: state.checkInValue,
      isCclr: state.isCclr,
      cclrValue: state.cclrValue,
      isDel: state.isDel,
      delValue: state.delValue,
      isStrStart: state.isStrStart,
      isStrEnd: state.isStrEnd,
      strStartValue: state.strStartValue,
      strEndValue: state.strEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "INV") {
    return {
      isBc: state.isBc,
      bcValue: state.bcValue,
      isInv: action.isInv,
      invValue: action.invValue,
      isBl: state.isBl,
      blValue: state.blValue,
      isCheckIn: state.isCheckIn,
      checkInValue: state.checkInValue,
      isCclr: state.isCclr,
      cclrValue: state.cclrValue,
      isDel: state.isDel,
      delValue: state.delValue,
      isStrStart: state.isStrStart,
      isStrEnd: state.isStrEnd,
      strStartValue: state.strStartValue,
      strEndValue: state.strEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "BL") {
    return {
      isBc: state.isBc,
      bcValue: state.bcValue,
      isInv: state.isInv,
      invValue: state.invValue,
      isBl: action.isBl,
      blValue: action.blValue,
      isCheckIn: state.isCheckIn,
      checkInValue: state.checkInValue,
      isCclr: state.isCclr,
      cclrValue: state.cclrValue,
      isDel: state.isDel,
      delValue: state.delValue,
      isStrStart: state.isStrStart,
      isStrEnd: state.isStrEnd,
      strStartValue: state.strStartValue,
      strEndValue: state.strEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "CHECKIN") {
    return {
      isBc: state.isBc,
      bcValue: state.bcValue,
      isInv: state.isInv,
      invValue: state.invValue,
      isBl: state.isBl,
      blValue: state.blValue,
      isCheckIn: action.isCheckIn,
      checkInValue: action.checkInValue,
      isCclr: state.isCclr,
      cclrValue: state.cclrValue,
      isDel: state.isDel,
      delValue: state.delValue,
      isStrStart: state.isStrStart,
      isStrEnd: state.isStrEnd,
      strStartValue: state.strStartValue,
      strEndValue: state.strEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "CCLR") {
    return {
      isBc: state.isBc,
      bcValue: state.bcValue,
      isInv: state.isInv,
      invValue: state.invValue,
      isBl: state.isBl,
      blValue: state.blValue,
      isCheckIn: state.isCheckIn,
      checkInValue: state.checkInValue,
      isCclr: action.isCclr,
      cclrValue: action.cclrValue,
      isDel: state.isDel,
      delValue: state.delValue,
      isStrStart: state.isStrStart,
      isStrEnd: state.isStrEnd,
      strStartValue: state.strStartValue,
      strEndValue: state.strEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "DEL") {
    return {
      isBc: state.isBc,
      bcValue: state.bcValue,
      isInv: state.isInv,
      invValue: state.invValue,
      isBl: state.isBl,
      blValue: state.blValue,
      isCheckIn: state.isCheckIn,
      checkInValue: state.checkInValue,
      isCclr: state.isCclr,
      cclrValue: state.cclrValue,
      isDel: action.isDel,
      delValue: action.delValue,
      isStrStart: state.isStrStart,
      isStrEnd: state.isStrEnd,
      strStartValue: state.strStartValue,
      strEndValue: state.strEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "STRSTART") {
    return {
      isBc: state.isBc,
      bcValue: state.bcValue,
      isInv: state.isInv,
      invValue: state.invValue,
      isBl: state.isBl,
      blValue: state.blValue,
      isCheckIn: state.isCheckIn,
      checkInValue: state.checkInValue,
      isCclr: state.isCclr,
      cclrValue: state.cclrValue,
      isDel: state.isDel,
      delValue: state.delValue,
      isStrStart: action.isStrStart,
      isStrEnd: state.isStrEnd,
      strStartValue: action.strStartValue,
      strEndValue: state.strEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "STREND") {
    return {
      isBc: state.isBc,
      bcValue: state.bcValue,
      isInv: state.isInv,
      invValue: state.invValue,
      isBl: state.isBl,
      blValue: state.blValue,
      isCheckIn: state.isCheckIn,
      checkInValue: state.checkInValue,
      isCclr: state.isCclr,
      cclrValue: state.cclrValue,
      isDel: state.isDel,
      delValue: state.delValue,
      isStrStart: state.isStrStart,
      isStrEnd: action.isStrEnd,
      strStartValue: state.strStartValue,
      strEndValue: action.strEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "MBLSURR") {
    return {
      isBc: state.isBc,
      bcValue: state.bcValue,
      isInv: state.isInv,
      invValue: state.invValue,
      isBl: state.isBl,
      blValue: state.blValue,
      isCheckIn: state.isCheckIn,
      checkInValue: state.checkInValue,
      isCclr: state.isCclr,
      cclrValue: state.cclrValue,
      isDel: state.isDel,
      delValue: state.delValue,
      isStrStart: state.isStrStart,
      isStrEnd: state.isStrEnd,
      strStartValue: state.strStartValue,
      strEndValue: state.strEndValue,
      isMblSurr: action.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: action.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "HBLSURR") {
    return {
      isBc: state.isBc,
      bcValue: state.bcValue,
      isInv: state.isInv,
      invValue: state.invValue,
      isBl: state.isBl,
      blValue: state.blValue,
      isCheckIn: state.isCheckIn,
      checkInValue: state.checkInValue,
      isCclr: state.isCclr,
      cclrValue: state.cclrValue,
      isDel: state.isDel,
      delValue: state.delValue,
      isStrStart: state.isStrStart,
      isStrEnd: state.isStrEnd,
      strStartValue: state.strStartValue,
      strEndValue: state.strEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: action.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: action.hblSurrDate,
    };
  }
};

const ShipmentExport = (props) => {
  const ctx = useContext(SelectContext);
  const today = getToday();

  const [isEdit, setIsEdit] = useState(false);

  const editBtnHandler = () => {
    setIsEdit(!isEdit);
  };

  const deleteBtnHandler = () => {
    deleteShipment(ctx.data, props.data);
    ctx.onCancel();
  };

  const [saveBtnShow, setSaveBtnShow] = useState(false);

  const [checklistState, dispatchChecklistState] = useReducer(
    checklistReducer,
    {
      isBc: props.data.bc.bcDone,
      isInv: props.data.inv.invDone,
      isBl: props.data.bl.blDone,
      isCheckIn: props.data.checkIn.checkInDone,
      isCclr: props.data.cclr.cclrDone,
      isDel: props.data.del.delDone,
      isStrStart: props.data.str.strStarted,
      isStrEnd: props.data.str.strDone,
      bcValue: props.data.bc.bcDate,
      invValue: props.data.inv.invDate,
      blValue: props.data.bl.blDate,
      checkInValue: props.data.checkIn.checkInDate,
      cclrValue: props.data.cclr.cclrDate,
      delValue: props.data.del.delDate,
      strStartValue: props.data.str.strDateStart,
      strEndValue: props.data.str.strDateEnd,
      isMblSurr: props.data.mbl.isMblSurr,
      isHblSurr: props.data.hbl.isHblSurr,
      mblSurrDate: props.data.mbl.surrDate,
      hblSurrDate: props.data.hbl.surrDate,
    }
  );

  const checklistBcHandler = (event) => {
    dispatchChecklistState({
      type: "BC",
      isBc: event.target.checked,
      bcValue: today,
    });
  };

  const checklistInvHandler = (event) => {
    dispatchChecklistState({
      type: "INV",
      isInv: event.target.checked,
      invValue: today,
    });
  };

  const checklistBlHandler = (event) => {
    dispatchChecklistState({
      type: "BL",
      isBl: event.target.checked,
      blValue: today,
    });
  };

  const checklistCheckInHandler = (event) => {
    dispatchChecklistState({
      type: "CHECKIN",
      isCheckIn: event.target.checked,
      checkInValue: today,
    });
  };

  const checklistCclrHandler = (event) => {
    dispatchChecklistState({
      type: "CCLR",
      isCclr: event.target.checked,
      cclrValue: today,
    });
  };

  const checklistDelHandler = (event) => {
    dispatchChecklistState({
      type: "DEL",
      isDel: event.target.checked,
      delValue: today,
    });
  };

  const checklistStrStartHandler = (event) => {
    dispatchChecklistState({
      type: "STRSTART",
      isStrStart: event.target.checked,
      strStartValue: today,
    });
  };

  const checklistStrEndHandler = (event) => {
    dispatchChecklistState({
      type: "STREND",
      isStrEnd: event.target.checked,
      strEndValue: today,
    });
  };

  const checklistMblHandler = (event) => {
    dispatchChecklistState({
      type: "MBLSURR",
      isMblSurr: event.target.checked,
      mblSurrDate: today,
    });
  };

  const checklistHblHandler = (event) => {
    dispatchChecklistState({
      type: "HBLSURR",
      isHblSurr: event.target.checked,
      hblSurrDate: today,
    });
  };

  const saveChecklistHandler = (event) => {
    event.preventDefault();

    const shipment = makeShipmentForChecklist(
      props.data,
      event,
      checklistState
    );
    saveChecklist(ctx.data, shipment);
    setSaveBtnShow(false);
  };

  useEffect(() => {
    if (
      props.data.bc.bcDone !== checklistState.isBc ||
      props.data.inv.invDone !== checklistState.isInv ||
      props.data.bl.blDone !== checklistState.isBl ||
      props.data.checkIn.checkInDone !== checklistState.isCheckIn ||
      props.data.cclr.cclrDone !== checklistState.isCclr ||
      props.data.del.delDone !== checklistState.isDel ||
      props.data.str.strStarted !== checklistState.isStrStart ||
      props.data.str.strDone !== checklistState.isStrEnd ||
      props.data.mbl.isMblSurr !== checklistState.isMblSurr ||
      props.data.hbl.isHblSurr !== checklistState.isHblSurr
    ) {
      setSaveBtnShow(true);
    } else {
      setSaveBtnShow(false);
    }
  }, [props.data, checklistState, saveBtnShow]);

  if (isEdit) {
    return (
      <ShipmentEditExport
        onCancel={editBtnHandler}
        onClose={props.onClose}
        data={props.data}
      />
    );
  } else {
    return (
      <form onSubmit={saveChecklistHandler}>
        <div className="shipment__top-menu">
          <ul className="shipment__top-menu-list">
            <li>
              <h1>{props.data.id}</h1>
            </li>
            <li>
              <p>{props.data.type}</p>
            </li>
            <li>
              <p>
                {props.data.contType === "BKR"
                  ? "BROKERAGE"
                  : props.data.contType === "LCLFAK"
                  ? "LCL"
                  : props.data.contType}
              </p>
            </li>
            <li>
              <p>{`${props.data.cutoff.slice(8, 10)}/${props.data.cutoff.slice(
                5,
                7
              )}/${props.data.cutoff.slice(0, 4)}`}</p>
            </li>
            {props.data.contType !== "BKR" && (
              <li>
                <span>
                  <p>MBL Surrendered: </p>
                  <input
                    type="checkbox"
                    onChange={checklistMblHandler}
                    defaultChecked={checklistState.isMblSurr}
                  />
                </span>
              </li>
            )}
            <li>
              <span>
                <p>HBL Surrendered: </p>
                <input
                  type="checkbox"
                  onChange={checklistHblHandler}
                  defaultChecked={checklistState.isHblSurr}
                />
              </span>
            </li>
            {saveBtnShow && (
              <li>
                <button className="shipment__top-menu-list__btn" type="submit">
                  Save
                </button>
              </li>
            )}
          </ul>
          <div className="shipment__detail">
            <div className="shipment__left">
              <div className="shipment__left__label">
                <p>Place of Loading: </p>
                {props.data.contType === "BKR" ? "" : <p>MBL: </p>}
                <p>HBL: </p>
                <p>Container Number: </p>
                <p>Vessel: </p>
                <p>Exporting Depot: </p>
              </div>
              <div className="shipment__left__input">
                <p>{props.data.pol}</p>
                {props.data.contType === "BKR" ? (
                  ""
                ) : (
                  <p>{props.data.mbl.number}</p>
                )}
                <p>{props.data.hbl.number}</p>
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
                  <p>Checklist:</p>
                </div>
                <div className="shipment__right__box-bottom">
                  <table className="shipment__right__box-bottom__table">
                    <tbody>
                      {props.data.bc.isBc && (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={checklistBcHandler}
                              defaultChecked={props.data.bc.bcDone}
                            />
                            <label>
                              <p>Booking Confirmation: </p>
                            </label>
                          </td>
                          <td>
                            {checklistState.isBc &&
                            checklistState.isBc === props.data.bc.bcDone ? (
                              <p>{props.data.bc.bcDate}</p>
                            ) : checklistState.isBc &&
                              checklistState.isBc !== props.data.bc.bcDone ? (
                              <p>{today}</p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                        </tr>
                      )}
                      {props.data.inv.isInv && (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={checklistInvHandler}
                              defaultChecked={props.data.inv.invDone}
                            />
                            <label>
                              <p>Invoice: </p>
                            </label>
                          </td>
                          <td>
                            {checklistState.isInv &&
                            checklistState.isInv === props.data.inv.invDone ? (
                              <p>{props.data.inv.invDate}</p>
                            ) : checklistState.isInv &&
                              checklistState.isInv !==
                                props.data.inv.invDone ? (
                              <p>{today}</p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                        </tr>
                      )}
                      {props.data.bl.isBl && (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={checklistBlHandler}
                              defaultChecked={props.data.bl.blDone}
                            />
                            <label>
                              <p>Bill of lading: </p>
                            </label>
                          </td>
                          <td>
                            {checklistState.isBl &&
                            checklistState.isBl === props.data.bl.blDone ? (
                              <p>{props.data.bl.blDate}</p>
                            ) : checklistState.isBl &&
                              checklistState.isBl !== props.data.bl.blDone ? (
                              <p>{today}</p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                        </tr>
                      )}

                      {props.data.checkIn.isCheckIn && (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={checklistCheckInHandler}
                              defaultChecked={props.data.checkIn.checkInDone}
                            />
                            <label>
                              <p>Check In: </p>
                            </label>
                          </td>
                          <td>
                            {checklistState.isCheckIn &&
                            checklistState.isCheckIn ===
                              props.data.checkIn.checkInDone ? (
                              <p>{props.data.checkIn.checkInDate}</p>
                            ) : checklistState.isCheckIn &&
                              checklistState.isCheckIn !==
                                props.data.checkIn.checkInDone ? (
                              <p>{today}</p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                        </tr>
                      )}

                      {props.data.cclr.isCclr && (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={checklistCclrHandler}
                              defaultChecked={props.data.cclr.cclrDone}
                            />
                            <label>
                              <p>Customs Clearance: </p>
                            </label>
                          </td>
                          <td>
                            {checklistState.isCclr &&
                            checklistState.isCclr ===
                              props.data.cclr.cclrDone ? (
                              <p>{props.data.cclr.cclrDate}</p>
                            ) : checklistState.isCclr &&
                              checklistState.isCclr !==
                                props.data.cclr.cclrDone ? (
                              <p>{today}</p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                        </tr>
                      )}

                      {props.data.del.isDel && (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={checklistDelHandler}
                              defaultChecked={props.data.del.delDone}
                            />
                            <label>
                              <p>Delivery: </p>
                            </label>
                          </td>
                          <td>
                            {checklistState.isDel &&
                            checklistState.isDel === props.data.del.delDone ? (
                              <p>{props.data.del.delDate}</p>
                            ) : checklistState.isDel &&
                              checklistState.isDel !==
                                props.data.del.delDone ? (
                              <p>{today}</p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                        </tr>
                      )}

                      {props.data.str.isStr && (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={checklistStrStartHandler}
                              defaultChecked={props.data.str.strStarted}
                            />
                            <label>
                              <p>Storage Start: </p>
                            </label>
                          </td>
                          <td>
                            {checklistState.isStrStart &&
                            checklistState.isStrStart ===
                              props.data.str.strStarted ? (
                              <p>{props.data.str.strDateStart}</p>
                            ) : checklistState.isStrStart &&
                              checklistState.isStrStart !==
                                props.data.str.strStarted ? (
                              <p>{today}</p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                        </tr>
                      )}

                      {props.data.str.isStr && props.data.str.strStarted && (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={checklistStrEndHandler}
                              defaultChecked={props.data.str.strDone}
                            />
                            <label>
                              <p>Storage End: </p>
                            </label>
                          </td>
                          <td>
                            {checklistState.isStrEnd &&
                            checklistState.isStrEnd ===
                              props.data.str.strDone ? (
                              <p>{props.data.str.strDateEnd}</p>
                            ) : checklistState.isStrEnd &&
                              checklistState.isStrEnd !==
                                props.data.str.strDone ? (
                              <p>{today}</p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shipment__bottom">
          <button onClick={editBtnHandler}>Edit</button>
          <button onClick={deleteBtnHandler}>Delete</button>
        </div>
      </form>
    );
  }
};

export default ShipmentExport;
