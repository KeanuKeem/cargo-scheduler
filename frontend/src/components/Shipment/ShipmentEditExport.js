import { useState, useContext, useRef, useEffect } from "react";

import { editShipment } from "../Reference/AddShipment";
import SelectContext from "../../store/select-context";
import TypeSelector from "../Calendar/Select/TypeSelector";

import "./ShipmentEdit.css";

const ShipmentEditExport = (props) => {
  const ctx = useContext(SelectContext);

  const [contTypeState, setContTypeState] = useState(props.data.contType);
  const [cutoffState, setCutoffState] = useState(props.data.cutoff);
  const [polState, setPolState] = useState(props.data.pol);
  const [vesselState, setVesselState] = useState(props.data.vessel);
  const [voyageState, setVoyageState] = useState(props.data.voyage);
  const [mblState, setMblState] = useState(props.data.mbl.number);
  const [hblState, setHblState] = useState(props.data.hbl.number);
  const [contState, setContState] = useState(props.data.container);
  const [depotState, setDepotState] = useState(props.data.depot);
  const [notesState, setNotesState] = useState(props.data.notes);
  const [bcState, setBcState] = useState(props.data.bc.isBc);
  const [invState, setInvState] = useState(props.data.inv.isInv);
  const [blState, setBlState] = useState(props.data.bl.isBl);
  const [checkInState, setCheckInState] = useState(
    props.data.checkIn.isCheckIn
  );
  const [cclrState, setCclrState] = useState(props.data.cclr.isCclr);
  const [delState, setDelState] = useState(props.data.del.isDel);
  const [strState, setStrState] = useState(props.data.str.isStr);

  const prevCutoffRef = useRef();

  useEffect(() => {
    prevCutoffRef.current = props.data.cutoff;
  }, [cutoffState, props.data.cutoff]);

  const contTypeEditHandler = (event) => {
    setContTypeState(event.target.value);
  };

  const cutoffEditHandler = (event) => {
    setCutoffState(event.target.value);
  };

  const polEditHandler = (event) => {
    setPolState(event.target.value);
  };

  const vesselEditHandler = (event) => {
    setVesselState(event.target.value);
  };

  const voyageEditHandler = (event) => {
    setVoyageState(event.target.value);
  };

  const mblEditHandler = (event) => {
    setMblState(event.target.value);
  };

  const hblEditHandler = (event) => {
    setHblState(event.target.value);
  };

  const contEditHandler = (event) => {
    setContState(event.target.value);
  };

  const depotEditHandler = (event) => {
    setDepotState(event.target.value);
  };

  const notesEditHandler = (event) => {
    setNotesState(event.target.value);
  };

  const bcEditHandler = (event) => {
    setBcState(event.target.checked);
  };

  const invEditHandler = (event) => {
    setInvState(event.target.checked);
  };

  const blEditHandler = (event) => {
    setBlState(event.target.checked);
  };

  const checkInEditHandler = (event) => {
    setCheckInState(event.target.checked);
  };

  const cclrEditHandler = (event) => {
    setCclrState(event.target.checked);
  };

  const delEditHandler = (event) => {
    setDelState(event.target.checked);
  };

  const strEditHandler = (event) => {
    setStrState(event.target.checked);
  };

  const editShipmentHandler = (event) => {
    event.preventDefault();
    const shipment = {
      id: props.data.id,
      mId: props.data.mId,
      type: props.data.type,
      contType: contTypeState,
      cutoff: cutoffState,
      prevCutoff: prevCutoffRef,
      pol: polState,
      vessel: vesselState.toUpperCase(),
      voyage: voyageState.toUpperCase(),
      mbl: {
        number: mblState,
        isMblSurr: props.data.mbl.isMblSurr,
        surrDate: props.data.mbl.surrDate,
      },
      hbl: {
        number: hblState,
        isHblSurr: props.data.hbl.isHblSurr,
        surrDate: props.data.hbl.surrDate,
      },
      container: contState.toUpperCase(),
      depot: depotState,
      notes: notesState,
      fakShipments: props.data.fakShipments,
      bc: {
        isBc: bcState,
        bcDone: props.data.bc.bcDone,
        bcDate: props.data.bc.bcDate,
      },
      inv: {
        isInv: invState,
        invDone: props.data.inv.invDone,
        invDate: props.data.inv.invDate,
      },
      bl: {
        isBl: blState,
        blDone: props.data.bl.blDone,
        blDate: props.data.bl.blDate,
      },
      checkIn: {
        isCheckIn: checkInState,
        checkInDone: props.data.checkIn.checkInDone,
        checkInDate: props.data.checkIn.checkInDate,
      },
      cclr: {
        isCclr: cclrState,
        cclrDone: props.data.cclr.cclrDone,
        cclrDate: props.data.cclr.cclrDate,
      },
      del: {
        isDel: delState,
        delDone: props.data.del.delDone,
        delDate: props.data.del.delDate,
      },
      str: {
        isStr: strState,
        strStarted: props.data.str.strStarted,
        strDone: props.data.str.strDone,
        strDateStart: props.data.str.strDate,
        strDateEnd: props.data.str.strDateEnd,
      },
    };
    editShipment(ctx.data, shipment);
    if (contTypeState === "FAK") {
      props.data.fakShipments.forEach((shipment) => {
        shipment.type = props.data.type;
        shipment.cutoff = cutoffState;
        shipment.prevCutoff = prevCutoffRef;
        shipment.pol = polState;
        shipment.vessel = vesselState.toUpperCase();
        shipment.voyage = voyageState.toUpperCase();
        shipment.container = contState.toUpperCase();
        shipment.depot = depotState;
        if (shipment.mbl.number.length === 0) {
          shipment.mbl.number = mblState;
        }

        shipment.fakShipments = "";
      });
    }
    props.onClose();
  };

  return (
    <form onSubmit={editShipmentHandler}>
      <div className="shipmentEdit__top-menu">
        <ul className="shipmentEdit__top-menu-list">
          <li>
            <h1>{props.data.id}</h1>
          </li>
          <li>
            <p>{props.data.type}</p>
          </li>
          <li>
            <p>
              {props.data.contType !== "LCLFAK" ? (
                <TypeSelector
                  type="contType"
                  typeHandler={contTypeEditHandler}
                  default={contTypeState}
                  shipmentType={props.data.type}
                />
              ) : (
                "LCL"
              )}
            </p>
          </li>
          <li>
            <p>
              {props.data.contType !== "LCLFAK" ? (
                <input
                  type="date"
                  min="2023-01-01"
                  defaultValue={cutoffState}
                  onChange={cutoffEditHandler}
                />
              ) : (
                props.data.cutoff
              )}
            </p>
          </li>
        </ul>
        <div className="shipmentEdit__detail">
          <div className="shipmentEdit__left">
            <div className="shipmentEdit__left__label">
              <p>Place of Loading: </p>
              {props.data.contType === "BKR" ? "" : <p>MBL: </p>}
              {props.data.contType === "FAK" ? "" : <p>HBL: </p>}
              <p>Container Number: </p>
              <p>Vessel: </p>
              <p>Voyage: </p>
              <p>Exporting Depot: </p>
            </div>
            <div className="shipmentEdit__left__input">
              <p>
                {props.data.contType !== "LCLFAK" ? (
                  <input
                    type="text"
                    defaultValue={polState}
                    onChange={polEditHandler}
                  />
                ) : (
                  props.data.pol
                )}
              </p>
              {props.data.contType === "BKR" ? (
                ""
              ) : (
                <p>
                  <input
                    type="text"
                    defaultValue={mblState}
                    onChange={mblEditHandler}
                  />
                </p>
              )}
              <p>
                {props.data.contType === "FAK" ? (
                  ""
                ) : (
                  <input
                    type="text"
                    name="hbl"
                    id="hbl"
                    defaultValue={hblState}
                    onChange={hblEditHandler}
                  />
                )}
              </p>
              <p>
                {props.data.contType !== "LCLFAK" ? (
                  <input
                    type="text"
                    defaultValue={contState}
                    onChange={contEditHandler}
                  />
                ) : (
                  props.data.container
                )}
              </p>
              <p>
                {props.data.contType !== "LCLFAK" ? (
                  <input
                    type="text"
                    defaultValue={vesselState}
                    onChange={vesselEditHandler}
                  />
                ) : (
                  props.data.vessel
                )}
              </p>
              <p>
                {props.data.contType !== "LCLFAK" ? (
                  <input
                    type="text"
                    defaultValue={voyageState}
                    onChange={voyageEditHandler}
                  />
                ) : (
                  props.data.voyage
                )}
              </p>
              <p>
                {props.data.contType !== "LCLFAK" ? (
                  <input
                    type="text"
                    defaultValue={depotState}
                    onChange={depotEditHandler}
                  />
                ) : (
                  props.data.depot
                )}
              </p>
            </div>
            <div className="shipmentEdit__left__notes">
              <span className="notes-label">Notes: </span>
              <p>
                <textarea
                  id="note"
                  name="note"
                  rows="10"
                  defaultValue={notesState}
                  onChange={notesEditHandler}
                />
              </p>
            </div>
          </div>
          <div className="shipmentEdit__right">
            <div className="shipmentEdit__right__box">
              <div className="shipmentEdit__right__box-top">
                <p>Checklist:</p>
              </div>
              <div className="shipmentEdit__right__box-bottom">
                <div className="shipmentEdit__right__box-bottom__left">
                  {props.data.contType === "FAK" ? (
                    ""
                  ) : (
                    <ul>
                      <li>
                        <input
                          type="checkbox"
                          onChange={bcEditHandler}
                          defaultChecked={bcState}
                        />
                        <label>
                          <p>Booking Confirmation: </p>
                        </label>
                      </li>

                      <li>
                        <input
                          type="checkbox"
                          onChange={invEditHandler}
                          defaultChecked={invState}
                        />
                        <label>
                          <p>Invoice: </p>
                        </label>
                      </li>

                      <li>
                        <input
                          type="checkbox"
                          onChange={blEditHandler}
                          defaultChecked={blState}
                        />
                        <label>
                          <p>Bill of Lading: </p>
                        </label>
                      </li>

                      <li>
                        <input
                          type="checkbox"
                          onChange={checkInEditHandler}
                          defaultChecked={checkInState}
                        />
                        <label>
                          <p>Check In: </p>
                        </label>
                      </li>

                      <li>
                        <input
                          type="checkbox"
                          onChange={cclrEditHandler}
                          defaultChecked={cclrState}
                        />
                        <label>
                          <p>Customs Clearance: </p>
                        </label>
                      </li>

                      <li>
                        <input
                          type="checkbox"
                          onChange={delEditHandler}
                          defaultChecked={delState}
                        />
                        <label>
                          <p>Delivery: </p>
                        </label>
                      </li>

                      <li>
                        <input
                          type="checkbox"
                          onChange={strEditHandler}
                          defaultChecked={strState}
                        />
                        <label>
                          <p>Storage: </p>
                        </label>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shipmentEdit__bottom">
        <button type="submit">Save</button>
        <button onClick={props.onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ShipmentEditExport;
