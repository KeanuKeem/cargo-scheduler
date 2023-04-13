import { useContext, useState, useEffect, useReducer } from "react";
import ShipmentEdit from "./ShipmentEdit";
import SelectContext from "../../store/select-context";

import {
  deleteShipment,
  makeShipmentForChecklist,
  saveChecklist,
} from "../Reference/AddShipment";
import { getToday } from "../Reference/Calendar";

import "./Shipment.css";
import axios from "axios";

const checklistReducer = (state, action) => {
  if (action.type === "ONE") {
    return {
      isStepOneDone: action.isStepOneDone,
      isStepTwoDone: state.isStepTwoDone,
      isStepThreeDone: state.isStepThreeDone,
      isStepFourDone: state.isStepFourDone,
      isStepFiveDone: state.isStepFiveDone,
      isStepSixDone: state.isStepSixDone,
      isStepSevenStart: state.isStepSevenStart,
      isStepSevenEnd: state.isStepSevenEnd,
      stepOneValue: action.stepOneValue,
      stepTwoValue: state.stepTwoValue,
      stepThreeValue: state.stepThreeValue,
      stepFourValue: state.stepFourValue,
      stepFiveValue: state.stepFiveValue,
      stepSixValue: state.stepSixValue,
      stepSevenStartValue: state.stepSevenStartValue,
      stepSevenEndValue: state.stepSevenEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "TWO") {
    return {
      isStepOneDone: state.isStepOneDone,
      isStepTwoDone: action.isStepTwoDone,
      isStepThreeDone: state.isStepThreeDone,
      isStepFourDone: state.isStepFourDone,
      isStepFiveDone: state.isStepFiveDone,
      isStepSixDone: state.isStepSixDone,
      isStepSevenStart: state.isStepSevenStart,
      isStepSevenEnd: state.isStepSevenEnd,
      stepOneValue: state.stepOneValue,
      stepTwoValue: action.stepTwoValue,
      stepThreeValue: state.stepThreeValue,
      stepFourValue: state.stepFourValue,
      stepFiveValue: state.stepFiveValue,
      stepSixValue: state.stepSixValue,
      stepSevenStartValue: state.stepSevenStartValue,
      stepSevenEndValue: state.stepSevenEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "THREE") {
    return {
      isStepOneDone: state.isStepOneDone,
      isStepTwoDone: state.isStepTwoDone,
      isStepThreeDone: action.isStepThreeDone,
      isStepFourDone: state.isStepFourDone,
      isStepFiveDone: state.isStepFiveDone,
      isStepSixDone: state.isStepSixDone,
      isStepSevenStart: state.isStepSevenStart,
      isStepSevenEnd: state.isStepSevenEnd,
      stepOneValue: state.stepOneValue,
      stepTwoValue: state.stepTwoValue,
      stepThreeValue: action.stepThreeValue,
      stepFourValue: state.stepFourValue,
      stepFiveValue: state.stepFiveValue,
      stepSixValue: state.stepSixValue,
      stepSevenStartValue: state.stepSevenStartValue,
      stepSevenEndValue: state.stepSevenEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "FOUR") {
    return {
      isStepOneDone: state.isStepOneDone,
      isStepTwoDone: state.isStepTwoDone,
      isStepThreeDone: state.isStepThreeDone,
      isStepFourDone: action.isStepFourDone,
      isStepFiveDone: state.isStepFiveDone,
      isStepSixDone: state.isStepSixDone,
      isStepSevenStart: state.isStepSevenStart,
      isStepSevenEnd: state.isStepSevenEnd,
      stepOneValue: state.stepOneValue,
      stepTwoValue: state.stepTwoValue,
      stepThreeValue: state.stepThreeValue,
      stepFourValue: action.stepFourValue,
      stepFiveValue: state.stepFiveValue,
      stepSixValue: state.stepSixValue,
      stepSevenStartValue: state.stepSevenStartValue,
      stepSevenEndValue: state.stepSevenEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "FIVE") {
    return {
      isStepOneDone: state.isStepOneDone,
      isStepTwoDone: state.isStepTwoDone,
      isStepThreeDone: state.isStepThreeDone,
      isStepFourDone: state.isStepFourDone,
      isStepFiveDone: action.isStepFiveDone,
      isStepSixDone: state.isStepSixDone,
      isStepSevenStart: state.isStepSevenStart,
      isStepSevenEnd: state.isStepSevenEnd,
      stepOneValue: state.stepOneValue,
      stepTwoValue: state.stepTwoValue,
      stepThreeValue: state.stepThreeValue,
      stepFourValue: state.stepFourValue,
      stepFiveValue: action.stepFiveValue,
      stepSixValue: state.stepSixValue,
      stepSevenStartValue: state.stepSevenStartValue,
      stepSevenEndValue: state.stepSevenEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "SIX") {
    return {
      isStepOneDone: state.isStepOneDone,
      isStepTwoDone: state.isStepTwoDone,
      isStepThreeDone: state.isStepThreeDone,
      isStepFourDone: state.isStepFourDone,
      isStepFiveDone: state.isStepFiveDone,
      isStepSixDone: action.isStepSixDone,
      isStepSevenStart: state.isStepSevenStart,
      isStepSevenEnd: state.isStepSevenEnd,
      stepOneValue: state.stepOneValue,
      stepTwoValue: state.stepTwoValue,
      stepThreeValue: state.stepThreeValue,
      stepFourValue: state.stepFourValue,
      stepFiveValue: state.stepFiveValue,
      stepSixValue: action.stepSixValue,
      stepSevenStartValue: state.stepSevenStartValue,
      stepSevenEndValue: state.stepSevenEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "SEVENSTART") {
    return {
      isStepOneDone: state.isStepOneDone,
      isStepTwoDone: state.isStepTwoDone,
      isStepThreeDone: state.isStepThreeDone,
      isStepFourDone: state.isStepFourDone,
      isStepFiveDone: state.isStepFiveDone,
      isStepSixDone: state.isStepSixDone,
      isStepSevenStart: action.isStepSevenStart,
      isStepSevenEnd: state.isStepSevenEnd,
      stepOneValue: state.stepOneValue,
      stepTwoValue: state.stepTwoValue,
      stepThreeValue: state.stepThreeValue,
      stepFourValue: state.stepFourValue,
      stepFiveValue: state.stepFiveValue,
      stepSixValue: state.stepSixValue,
      stepSevenStartValue: action.stepSevenStartValue,
      stepSevenEndValue: state.stepSevenEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "SEVENEND") {
    return {
      isStepOneDone: state.isStepOneDone,
      isStepTwoDone: state.isStepTwoDone,
      isStepThreeDone: state.isStepThreeDone,
      isStepFourDone: state.isStepFourDone,
      isStepFiveDone: state.isStepFiveDone,
      isStepSixDone: state.isStepSixDone,
      isStepSevenStart: state.isStepSevenStart,
      isStepSevenEnd: action.isStepSevenEnd,
      stepOneValue: state.stepOneValue,
      stepTwoValue: state.stepTwoValue,
      stepThreeValue: state.stepThreeValue,
      stepFourValue: state.stepFourValue,
      stepFiveValue: state.stepFiveValue,
      stepSixValue: state.stepSixValue,
      stepSevenStartValue: state.stepSevenStartValue,
      stepSevenEndValue: action.stepSevenEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "MBLSURR") {
    return {
      isStepOneDone: state.isStepOneDone,
      isStepTwoDone: state.isStepTwoDone,
      isStepThreeDone: state.isStepThreeDone,
      isStepFourDone: state.isStepFourDone,
      isStepFiveDone: state.isStepFiveDone,
      isStepSixDone: state.isStepSixDone,
      isStepSevenStart: state.isStepSevenStart,
      isStepSevenEnd: state.isStepSevenEnd,
      stepOneValue: state.stepOneValue,
      stepTwoValue: state.stepTwoValue,
      stepThreeValue: state.stepThreeValue,
      stepFourValue: state.stepFourValue,
      stepFiveValue: state.stepFiveValue,
      stepSixValue: state.stepSixValue,
      stepSevenStartValue: state.stepSevenStartValue,
      stepSevenEndValue: state.stepSevenEndValue,
      isMblSurr: action.isMblSurr,
      isHblSurr: state.isHblSurr,
      mblSurrDate: action.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
    };
  }
  if (action.type === "HBLSURR") {
    return {
      isStepOneDone: state.isStepOneDone,
      isStepTwoDone: state.isStepTwoDone,
      isStepThreeDone: state.isStepThreeDone,
      isStepFourDone: state.isStepFourDone,
      isStepFiveDone: state.isStepFiveDone,
      isStepSixDone: state.isStepSixDone,
      isStepSevenStart: state.isStepSevenStart,
      isStepSevenEnd: state.isStepSevenEnd,
      stepOneValue: state.stepOneValue,
      stepTwoValue: state.stepTwoValue,
      stepThreeValue: state.stepThreeValue,
      stepFourValue: state.stepFourValue,
      stepFiveValue: state.stepFiveValue,
      stepSixValue: state.stepSixValue,
      stepSevenStartValue: state.stepSevenStartValue,
      stepSevenEndValue: state.stepSevenEndValue,
      isMblSurr: state.isMblSurr,
      isHblSurr: action.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: action.hblSurrDate,
    };
  }
};

const Shipment = (props) => {
  const ctx = useContext(SelectContext);
  const today = getToday();

  const [isEdit, setIsEdit] = useState(false);
  const [saveBtnShow, setSaveBtnShow] = useState(false);

  const [checklistState, dispatchChecklistState] = useReducer(
    checklistReducer,
    {
      isStepOneDone: props.filteredData.stepOne.isDone,
      isStepTwoDone: props.filteredData.stepTwo.isDone,
      isStepThreeDone: props.filteredData.stepThree.isDone,
      isStepFourDone: props.filteredData.stepFour.isDone,
      isStepFiveDone: props.filteredData.stepFive.isDone,
      isStepSixDone: props.filteredData.stepSix.isDone,
      isStepSevenStart: props.filteredData.stepSeven.isStart,
      isStepSevenEnd: props.filteredData.stepSeven.isEnd,
      stepOneValue: props.filteredData.stepOne.date,
      stepTwoValue: props.filteredData.stepTwo.date,
      stepThreeValue: props.filteredData.stepThree.date,
      stepFourValue: props.filteredData.stepFour.date,
      stepFiveValue: props.filteredData.stepFive.date,
      stepSixValue: props.filteredData.stepSix.date,
      stepSevenStartValue: props.filteredData.stepSeven.startDate,
      stepSevenEndValue: props.filteredData.stepSeven.endDate,
      isMblSurr: props.filteredData.mbl.isSurr,
      isHblSurr: props.filteredData.hbl.isSurr,
      mblSurrDate: props.filteredData.mbl.date,
      hblSurrDate: props.filteredData.hbl.date,
    }
  );

  const editBtnHandler = () => {
    setIsEdit(!isEdit);
  };

  const deleteBtnHandler = async () => {
    if (props.filteredData.contType === "LCLFAK") {
      Promise.all([
        await axios
          .delete(
            `http://localhost:5000/api/shipment/fakShipment?mId=${props.mId}&id=${props.filteredData.ref}`
          )
          .catch((err) => {
            console.log(err);
          }),
        await axios
          .delete(
            `http://localhost:5000/api/shipment?id=${props.filteredData.ref}`
          )
          .catch((err) => {
            console.log(err);
          }),
      ]);

      props.onDataEdit(true);
      props.onBack();
    } else {
      await axios
        .delete(
          `http://localhost:5000/api/shipment?id=${props.filteredData.ref}`
        )

        .catch((err) => {
          console.log(err);
        });

      props.onClose();
    }
  };

  const checklistOneHandler = (event) => {
    dispatchChecklistState({
      type: "ONE",
      isStepOneDone: event.target.checked,
      stepOneValue: today,
    });
  };

  const checklistTwoHandler = (event) => {
    dispatchChecklistState({
      type: "TWO",
      isStepTwoDone: event.target.checked,
      stepTwoValue: today,
    });
  };

  const checklistThreeHandler = (event) => {
    dispatchChecklistState({
      type: "THREE",
      isStepThreeDone: event.target.checked,
      stepThreeValue: today,
    });
  };

  const checklistFourHandler = (event) => {
    dispatchChecklistState({
      type: "FOUR",
      isStepFourDone: event.target.checked,
      stepFourValue: today,
    });
  };

  const checklistFiveHandler = (event) => {
    dispatchChecklistState({
      type: "FIVE",
      isStepFiveDone: event.target.checked,
      stepFiveValue: today,
    });
  };

  const checklistSixHandler = (event) => {
    dispatchChecklistState({
      type: "SIX",
      isStepSixDone: event.target.checked,
      stepSixValue: today,
    });
  };

  const checklistSevenStartHandler = (event) => {
    dispatchChecklistState({
      type: "SEVENSTART",
      isStepSevenStart: event.target.checked,
      stepSevenStartValue: today,
    });
  };

  const checklistSevenEndHandler = (event) => {
    dispatchChecklistState({
      type: "SEVENEND",
      isStepSevenEnd: event.target.checked,
      stepSevenEndValue: today,
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

  const saveChecklistHandler = async (event) => {
    event.preventDefault();

    const shipment = {
      ref: props.filteredData.ref,
      mblNumber: props.filteredData.mbl.number,
      isMblSurr: checklistState.isMblSurr,
      mblSurrDate: checklistState.mblSurrDate,
      hblNumber: props.filteredData.hbl.number,
      isHblSurr: checklistState.isHblSurr,
      hblSurrDate: checklistState.hblSurrDate,
      isHandleStepOne: props.filteredData.stepOne.isHandle,
      isStepOneDone: checklistState.isStepOneDone,
      stepOneValue: checklistState.stepOneValue,
      isHandleStepTwo: props.filteredData.stepTwo.isHandle,
      isStepTwoDone: checklistState.isStepTwoDone,
      stepTwoValue: checklistState.stepTwoValue,
      isHandleStepThree: props.filteredData.stepThree.isHandle,
      isStepThreeDone: checklistState.isStepThreeDone,
      stepThreeValue: checklistState.stepThreeValue,
      isHandleStepFour: props.filteredData.stepFour.isHandle,
      isStepFourDone: checklistState.isStepFourDone,
      stepFourValue: checklistState.stepFourValue,
      isHandleStepFive: props.filteredData.stepFive.isHandle,
      isStepFiveDone: checklistState.isStepFiveDone,
      stepFiveValue: checklistState.stepFiveValue,
      isHandleSix: props.filteredData.stepSix.isHandle,
      isStepSixDone: checklistState.isStepSixDone,
      stepSixValue: checklistState.stepSixValue,
      isHandleStepSeven: props.filteredData.stepSeven.isHandle,
      isStepSevenStart: checklistState.isStepSevenStart,
      stepSevenStartValue: checklistState.stepSevenStartValue,
      isStepSevenEnd: checklistState.isStepSevenEnd,
      stepSevenEndValue: checklistState.stepSevenEndValue,
    };
    try {
      await axios.patch(
        "http://localhost:5000/api/shipment/checklist",
        shipment
      );
      setSaveBtnShow(false);
    } catch (err) {
      console.log(err);
    }
    props.onDataEdit(true);
  };

  useEffect(() => {
    if (
      props.filteredData.stepOne.isDone !== checklistState.isStepOneDone ||
      props.filteredData.stepTwo.isDone !== checklistState.isStepTwoDone ||
      props.filteredData.stepThree.isDone !== checklistState.isStepThreeDone ||
      props.filteredData.stepFour.isDone !== checklistState.isStepFourDone ||
      props.filteredData.stepFive.isDone !== checklistState.isStepFiveDone ||
      props.filteredData.stepSix.isDone !== checklistState.isStepSixDone ||
      props.filteredData.stepSeven.isStart !==
        checklistState.isStepSevenStart ||
      props.filteredData.stepSeven.isEnd !== checklistState.isStepSevenEnd ||
      props.filteredData.mbl.isSurr !== checklistState.isMblSurr ||
      props.filteredData.hbl.isSurr !== checklistState.isHblSurr
    ) {
      setSaveBtnShow(true);
    } else {
      setSaveBtnShow(false);
    }
  }, [props.filteredData, checklistState]);

  if (isEdit) {
    return (
      <ShipmentEdit
        onCancel={editBtnHandler}
        onClose={props.onClose}
        data={props.filteredData}
        onDataEdit={props.onDataEdit}
      />
    );
  } else {
    return (
      <form onSubmit={saveChecklistHandler}>
        <div className="shipment__top-menu">
          <ul className="shipment__top-menu-list">
            <li>
              <h1>{props.filteredData.ref}</h1>
            </li>
            <li>
              <p>{props.filteredData.cargoType}</p>
            </li>
            <li>
              <p>
                {props.filteredData.contType === "BKR"
                  ? "BROKERAGE"
                  : props.filteredData.contType === "LCLFAK"
                  ? "LCL"
                  : props.filteredData.contType}
              </p>
            </li>
            <li>
              <p>{`${props.filteredData.schedule.slice(
                8,
                10
              )}/${props.filteredData.schedule.slice(
                5,
                7
              )}/${props.filteredData.schedule.slice(0, 4)}`}</p>
            </li>
            {props.filteredData.contType !== "BKR" && (
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
                <p>Place of Discharge: </p>
                {props.filteredData.contType === "BKR" ? "" : <p>MBL: </p>}
                <p>HBL: </p>
                <p>Container Number: </p>
                <p>Vessel: </p>
                <p>Available Depot: </p>
              </div>
              <div className="shipment__left__input">
                <p>{props.filteredData.port}</p>
                {props.filteredData.contType === "BKR" ? (
                  ""
                ) : (
                  <p>{props.filteredData.mbl.number}</p>
                )}
                <p>{props.filteredData.hbl.number}</p>
                <p>{props.filteredData.container}</p>
                <p>{`${props.filteredData.vessel} ${props.filteredData.voyage}`}</p>
                <p>{props.filteredData.depot}</p>
              </div>
              <div className="shipment__left__notes">
                <span className="notes-label">Notes: </span>
                <p>{props.filteredData.notes}</p>
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
                      {props.filteredData.stepOne.isHandle && (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={checklistOneHandler}
                              defaultChecked={props.filteredData.stepOne.isDone}
                            />
                            <label>
                              <p>Arrival Notice: </p>
                            </label>
                          </td>
                          <td>
                            {checklistState.isStepOneDone &&
                            checklistState.isStepOneDone ===
                              props.filteredData.stepOne.isDone ? (
                              <p>{props.filteredData.stepOne.date}</p>
                            ) : checklistState.isStepOneDone &&
                              checklistState.isStepOneDone !==
                                props.filteredData.stepOne.isDone ? (
                              <p>{today}</p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                        </tr>
                      )}
                      {props.filteredData.stepTwo.isHandle && (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={checklistTwoHandler}
                              defaultChecked={props.filteredData.stepTwo.isDone}
                            />
                            <label>
                              <p>Invoice: </p>
                            </label>
                          </td>
                          <td>
                            {checklistState.isStepTwoDone &&
                            checklistState.isStepTwoDone ===
                              props.filteredData.stepTwo.isDone ? (
                              <p>{props.filteredData.stepTwo.date}</p>
                            ) : checklistState.isStepTwoDone &&
                              checklistState.isStepTwoDone !==
                                props.filteredData.stepTwo.isDone ? (
                              <p>{today}</p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                        </tr>
                      )}
                      {props.filteredData.stepThree.isHandle && (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={checklistThreeHandler}
                              defaultChecked={
                                props.filteredData.stepThree.isDone
                              }
                            />
                            <label>
                              <p>D/O: </p>
                            </label>
                          </td>
                          <td>
                            {checklistState.isStepThreeDone &&
                            checklistState.isStepThreeDone ===
                              props.filteredData.stepThree.isDone ? (
                              <p>{props.filteredData.stepThree.date}</p>
                            ) : checklistState.isStepThreeDone &&
                              checklistState.isStepThreeDone !==
                                props.filteredData.stepThree.isDone ? (
                              <p>{today}</p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                        </tr>
                      )}

                      {props.filteredData.stepFour.isHandle && (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={checklistFourHandler}
                              defaultChecked={
                                props.filteredData.stepFour.isDone
                              }
                            />
                            <label>
                              <p>Outturn Report: </p>
                            </label>
                          </td>
                          <td>
                            {checklistState.isStepFourDone &&
                            checklistState.isStepFourDone ===
                              props.filteredData.stepFour.isDone ? (
                              <p>{props.filteredData.stepFour.date}</p>
                            ) : checklistState.isStepFourDone &&
                              checklistState.isStepFourDone !==
                                props.filteredData.stepFour.isDone ? (
                              <p>{today}</p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                        </tr>
                      )}

                      {props.filteredData.stepFive.isHandle && (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={checklistFiveHandler}
                              defaultChecked={
                                props.filteredData.stepFive.isDone
                              }
                            />
                            <label>
                              <p>Customs Clearance: </p>
                            </label>
                          </td>
                          <td>
                            {checklistState.isStepFiveDone &&
                            checklistState.isStepFiveDone ===
                              props.filteredData.stepFive.isDone ? (
                              <p>{props.filteredData.stepFive.date}</p>
                            ) : checklistState.isStepFiveDone &&
                              checklistState.isStepFiveDone !==
                                props.filteredData.stepFive.isDone ? (
                              <p>{today}</p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                        </tr>
                      )}

                      {props.filteredData.stepSix.isHandle && (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={checklistSixHandler}
                              defaultChecked={props.filteredData.stepSix.isDone}
                            />
                            <label>
                              <p>Delivery: </p>
                            </label>
                          </td>
                          <td>
                            {checklistState.isStepSixDone &&
                            checklistState.isStepSixDone ===
                              props.filteredData.stepSix.isDone ? (
                              <p>{props.filteredData.stepSix.date}</p>
                            ) : checklistState.isStepSixDone &&
                              checklistState.isStepSixDone !==
                                props.filteredData.stepSix.isDone ? (
                              <p>{today}</p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                        </tr>
                      )}

                      {props.filteredData.stepSeven.isHandle && (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onChange={checklistSevenStartHandler}
                              defaultChecked={
                                props.filteredData.stepSeven.isStart
                              }
                            />
                            <label>
                              <p>Storage Start: </p>
                            </label>
                          </td>
                          <td>
                            {checklistState.isStepSevenStart &&
                            checklistState.isStepSevenStart ===
                              props.filteredData.stepSeven.isStart ? (
                              <p>{props.filteredData.stepSeven.date}</p>
                            ) : checklistState.isStepSevenStart &&
                              checklistState.isStepSevenStart !==
                                props.filteredData.stepSeven.isStart ? (
                              <p>{today}</p>
                            ) : (
                              <p></p>
                            )}
                          </td>
                        </tr>
                      )}

                      {props.filteredData.stepSeven.isHandle &&
                        props.filteredData.stepSeven.isStart && (
                          <tr>
                            <td>
                              <input
                                type="checkbox"
                                onChange={checklistSevenEndHandler}
                                defaultChecked={
                                  props.filteredData.stepSeven.isEnd
                                }
                              />
                              <label>
                                <p>Storage End: </p>
                              </label>
                            </td>
                            <td>
                              {checklistState.isStepSevenEnd &&
                              checklistState.isStepSevenEnd ===
                                props.filteredData.stepSeven.isEnd ? (
                                <p>{props.filteredData.stepSeven.date}</p>
                              ) : checklistState.isStepSevenEnd &&
                                checklistState.isStepSevenEnd !==
                                  props.filteredData.stepSeven.isEnd ? (
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

export default Shipment;
