import { useState, useContext, useRef, useEffect } from "react";

import { editShipment } from "../Reference/AddShipment";
import { getMonth } from "../Reference/Calendar";
import SelectContext from "../../store/select-context";
import TypeSelector from "../Calendar/Select/TypeSelector";

import "./ShipmentEdit.css";
import axios from "axios";

const ShipmentEdit = (props) => {
  const ctx = useContext(SelectContext);

  const [contTypeState, setContTypeState] = useState(props.data.contType);
  const [scheduleState, setScheduleState] = useState(props.data.schedule);
  const [portState, setPortState] = useState(props.data.port);
  const [vesselState, setVesselState] = useState(props.data.vessel);
  const [voyageState, setVoyageState] = useState(props.data.voyage);
  const [mblState, setMblState] = useState(props.data.mbl.number);
  const [hblState, setHblState] = useState(props.data.hbl.number);
  const [contState, setContState] = useState(props.data.container);
  const [depotState, setDepotState] = useState(props.data.depot);
  const [notesState, setNotesState] = useState(props.data.notes);
  const [oneState, setOneState] = useState(props.data.stepOne.isHandle);
  const [twoState, setTwoState] = useState(props.data.stepTwo.isHandle);
  const [threeState, setThreeState] = useState(props.data.stepThree.isHandle);
  const [fourState, setFourState] = useState(props.data.stepFour.isHandle);
  const [fiveState, setFiveState] = useState(props.data.stepFive.isHandle);
  const [sixState, setSixState] = useState(props.data.stepSix.isHandle);
  const [sevenState, setSevenState] = useState(props.data.stepSeven.isHandle);

  const prevScheduleRef = useRef();

  useEffect(() => {
    prevScheduleRef.current = props.data.schedule;
  }, [scheduleState, props.data.schedule]);

  const contTypeEditHandler = (event) => {
    setContTypeState(event.target.value);
  };

  const scheduleEditHandler = (event) => {
    setScheduleState(event.target.value);
  };

  const portEditHandler = (event) => {
    setPortState(event.target.value);
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

  const oneEditHandler = (event) => {
    setOneState(event.target.checked);
  };

  const twoEditHandler = (event) => {
    setTwoState(event.target.checked);
  };

  const threeEditHandler = (event) => {
    setThreeState(event.target.checked);
  };

  const fourEditHandler = (event) => {
    setFourState(event.target.checked);
  };

  const fiveEditHandler = (event) => {
    setFiveState(event.target.checked);
  };

  const sixEditHandler = (event) => {
    setSixState(event.target.checked);
  };

  const sevenEditHandler = (event) => {
    setSevenState(event.target.checked);
  };

  const editShipmentHandler = async (event) => {
    event.preventDefault();
    const shipment = {
      ref: props.data.ref,
      cargoType: props.data.cargoType,
      contType: contTypeState,
      schedule: scheduleState,
      prevSchedule: prevScheduleRef.current,
      port: portState,
      vessel: vesselState,
      voyage: voyageState,
      mbl: {
        number: mblState,
        isSurr: props.data.mbl.isSurr,
        date: props.data.mbl.date,
      },
      hbl: {
        number: hblState,
        isSurr: props.data.hbl.isSurr,
        date: props.data.hbl.date,
      },
      container: contState,
      depot: depotState,
      notes: notesState,
      fakShipments: props.data.fakShipments,
      day: {
        date: Number(scheduleState.slice(8, 10)),
        month: getMonth(Number(scheduleState.slice(5, 7))),
        year: Number(scheduleState.slice(0, 4)),
      },
      stepOne: {
        isHandle: oneState,
        isDone: props.data.stepOne.isDone,
        date: props.data.stepOne.date,
      },
      stepTwo: {
        isHandle: twoState,
        isDone: props.data.stepTwo.isDone,
        date: props.data.stepTwo.date,
      },
      stepThree: {
        isHandle: threeState,
        isDone: props.data.stepThree.isDone,
        date: props.data.stepThree.date,
      },
      stepFour: {
        isHandle: fourState,
        isDone: props.data.stepFour.isDone,
        date: props.data.stepFour.date,
      },
      stepFive: {
        isHandle: fiveState,
        isDone: props.data.stepFive.isDone,
        date: props.data.stepFive.date,
      },
      stepSix: {
        isHandle: sixState,
        isDone: props.data.stepSix.isDone,
        date: props.data.stepSix.date,
      },
      stepSeven: {
        isHandle: sevenState,
        isStart: props.data.stepSeven.isStart,
        isEnd: props.data.stepSeven.isEnd,
        startDate: props.data.stepSeven.startDate,
        endDate: props.data.stepSeven.endDate,
      },
    };

    if (contTypeState === "FAK") {
      await axios
        .patch(
          `http://localhost:5000/api/shipment/fakShipment?id=${props.data.ref}`,
          shipment
        )
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .patch("http://localhost:5000/api/shipment/edit", shipment)
        .catch((err) => {
          console.log(err);
        });
    }

    props.onDataEdit(true);
    props.onClose();
  };

  return (
    <form onSubmit={editShipmentHandler}>
      <div className="shipmentEdit__top-menu">
        <ul className="shipmentEdit__top-menu-list">
          <li>
            <h1>{props.data.ref}</h1>
          </li>
          <li>
            <p>{props.data.cargoType}</p>
          </li>
          <li>
            <p>
              {props.data.contType !== "LCLFAK" ? (
                <TypeSelector
                  type="contType"
                  typeHandler={contTypeEditHandler}
                  default={contTypeState}
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
                  name="eta"
                  id="eta"
                  defaultValue={scheduleState}
                  onChange={scheduleEditHandler}
                />
              ) : (
                props.data.schedule
              )}
            </p>
          </li>
        </ul>
        <div className="shipmentEdit__detail">
          <div className="shipmentEdit__left">
            <div className="shipmentEdit__left__label">
              <p>Place of Discharge: </p>
              {contTypeState === "BKR" ? "" : <p>MBL: </p>}
              {contTypeState === "FAK" ? "" : <p>HBL: </p>}
              <p>Container Number: </p>
              <p>Vessel: </p>
              <p>Voyage: </p>
              <p>Available Depot: </p>
            </div>
            <div className="shipmentEdit__left__input">
              <p>
                {props.data.contType !== "LCLFAK" ? (
                  <input
                    type="text"
                    defaultValue={portState}
                    onChange={portEditHandler}
                  />
                ) : (
                  props.data.port
                )}
              </p>
              <p>
                {contTypeState === "BKR" ? (
                  ""
                ) : (
                  <input
                    type="text"
                    defaultValue={mblState}
                    onChange={mblEditHandler}
                  />
                )}
              </p>
              <p>
                {contTypeState === "FAK" ? (
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
                          onChange={oneEditHandler}
                          defaultChecked={oneState}
                        />
                        <label>
                          <p>Arrival Notice: </p>
                        </label>
                      </li>

                      <li>
                        <input
                          type="checkbox"
                          onChange={twoEditHandler}
                          defaultChecked={twoState}
                        />
                        <label>
                          <p>Invoice: </p>
                        </label>
                      </li>

                      <li>
                        <input
                          type="checkbox"
                          onChange={threeEditHandler}
                          defaultChecked={threeState}
                        />
                        <label>
                          <p>Delivery Order: </p>
                        </label>
                      </li>

                      <li>
                        <input
                          type="checkbox"
                          onChange={fourEditHandler}
                          defaultChecked={fourState}
                        />
                        <label>
                          <p>Outturn Report: </p>
                        </label>
                      </li>

                      <li>
                        <input
                          type="checkbox"
                          onChange={fiveEditHandler}
                          defaultChecked={fiveState}
                        />
                        <label>
                          <p>Customs Clearance: </p>
                        </label>
                      </li>

                      <li>
                        <input
                          type="checkbox"
                          onChange={sixEditHandler}
                          defaultChecked={sixState}
                        />
                        <label>
                          <p>Delivery: </p>
                        </label>
                      </li>

                      <li>
                        <input
                          type="checkbox"
                          onChange={sevenEditHandler}
                          defaultChecked={sevenState}
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

export default ShipmentEdit;
