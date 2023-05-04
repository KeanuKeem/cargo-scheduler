import { useState, useContext, useRef, useEffect } from "react";

import { makeEditShipment } from "../Reference/AddShipment";
import SelectContext from "../../store/select-context";
import TypeSelector from "../Calendar/Select/TypeSelector";

import "./Shipment.css";
import "./ShipmentEdit.css";
import axios from "axios";
import ShipmentPopup from "./ShipmentPopup";

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
  const [oneState, setOneState] = useState(
    props.data.contType !== "FAK" ? props.data.stepOne.isHandle : ""
  );
  const [twoState, setTwoState] = useState(
    props.data.contType !== "FAK" ? props.data.stepTwo.isHandle : ""
  );
  const [threeState, setThreeState] = useState(
    props.data.contType !== "FAK" ? props.data.stepThree.isHandle : ""
  );
  const [fourState, setFourState] = useState(
    props.data.contType !== "FAK" ? props.data.stepFour.isHandle : ""
  );
  const [fiveState, setFiveState] = useState(
    props.data.contType !== "FAK" ? props.data.stepFive.isHandle : ""
  );
  const [sixState, setSixState] = useState(
    props.data.contType !== "FAK" ? props.data.stepSix.isHandle : ""
  );
  const [sevenState, setSevenState] = useState(
    props.data.contType !== "FAK" ? props.data.stepSeven.isHandle : ""
  );
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

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

  const okayBtnHandler = () => {
    props.onClose();
  };

  const editShipmentHandler = async (event) => {
    event.preventDefault();

    const shipment = makeEditShipment(
      props.data.ref,
      contTypeState,
      scheduleState,
      prevScheduleRef.current,
      portState,
      vesselState,
      voyageState,
      mblState,
      hblState,
      contState,
      depotState,
      notesState,
      props.data.fakShipments,
      oneState,
      twoState,
      threeState,
      fourState,
      fiveState,
      sixState,
      sevenState
    );

    await axios
      .patch(process.env.REACT_APP_BACKEND_URL + "/shipment/edit", shipment, {
        headers: { Authorization: "Bearer " + ctx.token },
      })
      .then((result) => {
        props.onDataEdit(true);
        setPopup(true);
        setPopupMessage(result.data);
      })
      .catch((err) => {
        setPopup(true);
        setPopupMessage(err.response.data);
        console.log(err);
      });
  };

  return (
    <>
      {popup && (
        <ShipmentPopup
          type="notification"
          text={popupMessage}
          onClick={okayBtnHandler}
          button="Okay!"
        />
      )}
      <form onSubmit={editShipmentHandler}>
        <div className="shipment__top-menu">
          <ul className="shipment__top-menu-list">
            <li>
              <h1 className="shipment__id">{props.data.ref}</h1>
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
          <div className="shipment__detail">
            <div className="shipment__left">
              <div className="shipment__left__items">
                <p>Place of Discharge: </p>
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
              </div>
              <div className="shipment__left__items">
                {contTypeState !== "BKR" && <p>MBL: </p>}
                {contTypeState !== "BKR" && (
                  <p>
                    <input
                      type="text"
                      defaultValue={mblState}
                      onChange={mblEditHandler}
                    />
                  </p>
                )}
              </div>
              <div className="shipment__left__items">
                {contTypeState !== "FAK" && <p>HBL: </p>}
                {contTypeState !== "FAK" && (
                  <p>
                    <input
                      type="text"
                      name="hbl"
                      id="hbl"
                      defaultValue={hblState}
                      onChange={hblEditHandler}
                    />
                  </p>
                )}
              </div>
              {props.data.contType !== "AIR" && (
                <div className="shipment__left__items">
                  <p>Container Number: </p>
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
                </div>
              )}
              <div className="shipment__left__items">
                {props.data.contType !== "AIR" ? (
                  <p>Vessel: </p>
                ) : (
                  <p>Flight: </p>
                )}
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
              </div>
              {props.data.contType !== "AIR" && (
                <div className="shipment__left__items">
                  <p>Voyage: </p>
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
                </div>
              )}
              <div className="shipment__left__items">
                <p>Available Depot: </p>
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

              <div className="shipment__left__notes">
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
            <div className="shipment__right">
              <div className="shipment__right__box">
                <div className="shipment__right__box-top">
                  <p>Checklist:</p>
                </div>
                <div className="shipment__right__box-bottom">
                  <div className="shipment__right__box-bottom__left">
                    {props.data.contType === "FAK" ? (
                      ""
                    ) : (
                      <ul className="edit__ul">
                        <li className="edit__li">
                          <label>
                            {props.data.cargoType === "Import" ? (
                              <p>Arrival Notice: </p>
                            ) : (
                              <p>Booking Confirmation</p>
                            )}
                          </label>
                          <input
                            type="checkbox"
                            onChange={oneEditHandler}
                            defaultChecked={oneState}
                          />
                        </li>

                        <li className="edit__li">
                          <label>
                            <p>Invoice: </p>
                          </label>
                          <input
                            type="checkbox"
                            onChange={twoEditHandler}
                            defaultChecked={twoState}
                          />
                        </li>

                        <li className="edit__li">
                          <label>
                            {props.data.cargoType === "Import" ? (
                              <p>Delivery Order: </p>
                            ) : (
                              <p>Bill of Lading</p>
                            )}
                          </label>
                          <input
                            type="checkbox"
                            onChange={threeEditHandler}
                            defaultChecked={threeState}
                          />
                        </li>

                        <li className="edit__li">
                          <label>
                            {props.data.cargoType === "Import" ? (
                              <p>Outturn Report: </p>
                            ) : (
                              <p>Check in Detail</p>
                            )}
                          </label>
                          <input
                            type="checkbox"
                            onChange={fourEditHandler}
                            defaultChecked={fourState}
                          />
                        </li>

                        <li className="edit__li">
                          <label>
                            <p>Customs Clearance: </p>
                          </label>
                          <input
                            type="checkbox"
                            onChange={fiveEditHandler}
                            defaultChecked={fiveState}
                          />
                        </li>

                        <li className="edit__li">
                          <label>
                            <p>Delivery: </p>
                          </label>
                          <input
                            type="checkbox"
                            onChange={sixEditHandler}
                            defaultChecked={sixState}
                          />
                        </li>

                        <li className="edit__li">
                          <label>
                            <p>Storage: </p>
                          </label>
                          <input
                            type="checkbox"
                            onChange={sevenEditHandler}
                            defaultChecked={sevenState}
                          />
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shipment__bottom">
          <button type="submit">Save</button>
          <button onClick={props.onCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
};

export default ShipmentEdit;
