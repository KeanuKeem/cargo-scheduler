import { useContext, useState, useEffect, useReducer } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import SelectContext from "../../store/select-context";
import ShipmentEdit from "./ShipmentEdit";
import ShipmentPopup from "./ShipmentPopup";

import { makeChecklist } from "../Reference/AddShipment";
import { getToday } from "../Reference/Calendar";

import "./Shipment.css";

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
      isHold: state.isHold,
      isDtr: state.isDtr,
      dtrDate: state.dtrDate,
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
      isHold: state.isHold,
      isDtr: state.isDtr,
      dtrDate: state.dtrDate,
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
      isHold: state.isHold,
      isDtr: state.isDtr,
      dtrDate: state.dtrDate,
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
      isHold: state.isHold,
      isDtr: state.isDtr,
      dtrDate: state.dtrDate,
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
      isHold: state.isHold,
      isDtr: state.isDtr,
      dtrDate: state.dtrDate,
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
      isHold: state.isHold,
      isDtr: state.isDtr,
      dtrDate: state.dtrDate,
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
      isHold: state.isHold,
      isDtr: state.isDtr,
      dtrDate: state.dtrDate,
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
      isHold: state.isHold,
      isDtr: state.isDtr,
      dtrDate: state.dtrDate,
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
      isHold: state.isHold,
      isDtr: state.isDtr,
      dtrDate: state.dtrDate,
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
      isHold: state.isHold,
      isDtr: state.isDtr,
      dtrDate: state.dtrDate,
    };
  }
  if (action.type === "HOLD") {
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
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
      isHold: action.isHold,
      isDtr: state.isDtr,
      dtrDate: state.dtrDate,
    };
  }
  if (action.type === "DTR") {
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
      isHblSurr: state.isHblSurr,
      mblSurrDate: state.mblSurrDate,
      hblSurrDate: state.hblSurrDate,
      isHold: state.isHold,
      isDtr: action.isDtr,
      dtrDate: action.dtrDate,
    };
  }
};

const Shipment = (props) => {
  const ctx = useContext(SelectContext);
  const today = getToday();

  const [isEdit, setIsEdit] = useState(false);
  const [saveBtnShow, setSaveBtnShow] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isFavourite, setIsFavourite] = useState(props.filteredData.favourite);
  const [showMblSurr, setShowMblSurr] = useState(false);
  const [showHblSurr, setShowHblSurr] = useState(false);

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
      isHold: props.filteredData.isHold || false,
      isDtr: props.filteredData.dtr.isDtr || false,
      dtrDate: props.filteredData.dtr.date || "",
    }
  );

  const editBtnHandler = () => {
    setIsEdit(!isEdit);
  };

  const deleteShipmentHandler = async () => {
    if (props.filteredData.contType === "LCLFAK") {
      await axios
        .delete(
          process.env.REACT_APP_BACKEND_URL +
            `/shipment?mId=${props.mId}&id=${props.filteredData.ref}`,
          { headers: { Authorization: "Bearer " + ctx.token } }
        )
        .catch((err) => {
          console.log(err);
        });

      props.onDataEdit(true);
      props.onBack();
    } else {
      await axios
        .delete(
          process.env.REACT_APP_BACKEND_URL +
            `/shipment?mId=&id=${props.filteredData.ref}`,
          { headers: { Authorization: "Bearer " + ctx.token } }
        )
        .then(() => {
          props.onDataEdit(true);
          props.onClose();
        })
        .catch((err) => {
          setIsSaved(true);
          setSaveMessage(err.response.data);
        });
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

  const checklistHoldHandler = (event) => {
    dispatchChecklistState({
      type: "HOLD",
      isHold: event.target.checked,
    });
  };

  const checklistDtrHandler = (event) => {
    dispatchChecklistState({
      type: "DTR",
      isDtr: event.target.checked,
      dtrDate: today,
    });
  };

  const deleteBtnHandler = () => {
    setIsDelete(true);
  };

  const deleteBtnCancelHandler = () => {
    setIsDelete(false);
  };

  const okayBtnHandler = () => {
    setIsSaved(false);
  };

  const saveChecklistHandler = async (event) => {
    event.preventDefault();

    const shipment = makeChecklist(
      props.filteredData.ref,
      props.filteredData.contType,
      checklistState,
      isFavourite
    );

    try {
      await axios
        .patch(
          process.env.REACT_APP_BACKEND_URL + "/shipment/checklist",
          shipment,
          {
            headers: { Authorization: "Bearer " + ctx.token },
          }
        )
        .then((result) => {
          setSaveBtnShow(false);
          setIsSaved(true);
          setSaveMessage(result.data);
        });
    } catch (err) {
      setIsSaved(true);
      setIsDelete(false);
      setSaveMessage(err.response.data);
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
      props.filteredData.hbl.isSurr !== checklistState.isHblSurr ||
      props.filteredData.favourite !== isFavourite ||
      props.filteredData.isHold !== checklistState.isHold ||
      props.filteredData.dtr.isDtr !== checklistState.isDtr
    ) {
      setSaveBtnShow(true);
    } else {
      setSaveBtnShow(false);
    }
  }, [props.filteredData, checklistState, isFavourite]);

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
      <>
        {isSaved && (
          <ShipmentPopup
            type="notification"
            text={saveMessage}
            button="Okay!"
            onClick={okayBtnHandler}
          />
        )}
        {isDelete && (
          <ShipmentPopup
            type="select"
            text="Would you really wish to delete this shipment?"
            buttonOne="Yes"
            buttonTwo="No"
            onClickOne={deleteShipmentHandler}
            onClickTwo={deleteBtnCancelHandler}
          />
        )}
        <form onSubmit={saveChecklistHandler}>
          <div className="shipment__top-menu">
            <ul className="shipment__top-menu-list">
              <li>
                <h1 className="shipment__id">{props.filteredData.ref}</h1>
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
              {props.filteredData.contType !== "BKR" &&
                props.filteredData.mbl.number !== "" && (
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
                          onChange={checklistMblHandler}
                          defaultChecked={checklistState.isMblSurr}
                        />
                      </span>
                      {props.filteredData.mbl.isSurr && showMblSurr && (
                        <div className="shipment__mbl__show">
                          <p>
                            MBL Surrendered on: {props.filteredData.mbl.date}
                          </p>
                        </div>
                      )}
                    </div>
                  </li>
                )}
              <li>
                <div className="shipment__hbl">
                  <span>
                    <p
                      onMouseEnter={() => {
                        setShowHblSurr(true);
                      }}
                      onMouseLeave={() => {
                        setShowHblSurr(false);
                      }}
                    >
                      HBL Surrendered:{" "}
                    </p>
                    <input
                      type="checkbox"
                      onChange={checklistHblHandler}
                      defaultChecked={checklistState.isHblSurr}
                    />
                  </span>
                  {props.filteredData.hbl.isSurr && showHblSurr && (
                    <div className="shipment__hbl__show">
                      <p>HBL Surrendered on: {props.filteredData.hbl.date}</p>
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
                      onChange={checklistHoldHandler}
                      defaultChecked={checklistState.isHold}
                    />
                  </span>
                </div>
              </li>
              {saveBtnShow && (
                <li>
                  <button
                    className="shipment__top-menu-list__btn"
                    type="submit"
                  >
                    Save
                  </button>
                </li>
              )}
            </ul>
            <div className="shipment__detail">
              <div className="shipment__left">
                <div
                  className={
                    props.filteredData.contType === "BKR"
                      ? "sm__hide"
                      : "shipment__left__sm__items"
                  }
                >
                  <p
                    onMouseEnter={() => {
                      setShowMblSurr(true);
                    }}
                    onMouseLeave={() => {
                      setShowMblSurr(false);
                    }}
                  >
                    MBL Surrendered:
                  </p>
                  <input
                    type="checkbox"
                    onChange={checklistMblHandler}
                    defaultChecked={checklistState.isMblSurr}
                  />
                </div>
                <div
                  className={
                    props.filteredData.contType === "FAK"
                      ? "sm__hide"
                      : "shipment__left__sm__items"
                  }
                >
                  <p
                    onMouseEnter={() => {
                      setShowHblSurr(true);
                    }}
                    onMouseLeave={() => {
                      setShowHblSurr(false);
                    }}
                  >
                    HBL Surrendered:
                  </p>
                  <input
                    type="checkbox"
                    onChange={checklistHblHandler}
                    defaultChecked={checklistState.isHblSurr}
                  />
                </div>
                <div
                  className={
                    props.filteredData.contType === "FAK"
                      ? "sm__hide"
                      : "shipment__left__sm-hold__items"
                  }
                >
                  <p>Shipment on Hold:</p>
                  <input
                    type="checkbox"
                    onChange={checklistHoldHandler}
                    defaultChecked={checklistState.isHold}
                  />
                </div>
                <div className="shipment__left__items">
                  <p>Place of Discharge: </p>
                  <p>{props.filteredData.port}</p>
                </div>
                {props.filteredData.contType !== "BKR" &&
                  props.filteredData.mbl.number !== "" && (
                    <div className="shipment__left__items">
                      <p>MBL: </p>
                      <p>{props.filteredData.mbl.number}</p>
                    </div>
                  )}
                <div className="shipment__left__items">
                  <p>HBL: </p>
                  <p>{props.filteredData.hbl.number}</p>
                </div>
                {props.filteredData.contType !== "AIR" && (
                  <div className="shipment__left__items">
                    <p>Container Number: </p>
                    <p>{props.filteredData.container}</p>
                  </div>
                )}
                <div className="shipment__left__items">
                  {props.filteredData.contType !== "AIR" ? (
                    <p>Vessel: </p>
                  ) : (
                    <p>Flight:</p>
                  )}
                  {props.filteredData.contType !== "AIR" ? (
                    <p>{`${props.filteredData.vessel} ${props.filteredData.voyage}`}</p>
                  ) : (
                    <p>{props.filteredData.vessel}</p>
                  )}
                </div>
                <div className="shipment__left__items">
                  <p>Available Depot: </p>
                  <p>{props.filteredData.depot}</p>
                </div>
                <div className="shipment__left__items">
                  <p>
                    Domestic Transfer Request:
                    <input
                      type="checkbox"
                      onChange={checklistDtrHandler}
                      defaultChecked={checklistState.isDtr}
                    />
                  </p>
                  <p>
                    {props.filteredData.dtr.isDtr ? props.filteredData.dtr.date : ""}
                  </p>
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
                                defaultChecked={
                                  props.filteredData.stepOne.isDone
                                }
                              />
                              <label>
                                {props.filteredData.cargoType === "Import" ? (
                                  <p>Arrival Notice: </p>
                                ) : (
                                  <p>Booking Confirmation</p>
                                )}
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
                                defaultChecked={
                                  props.filteredData.stepTwo.isDone
                                }
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
                                {props.filteredData.cargoType === "Import" ? (
                                  <p>D/O: </p>
                                ) : (
                                  <p>B/L</p>
                                )}
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
                                {props.filteredData.cargoType === "Import" ? (
                                  <p>Outturn Report: </p>
                                ) : (
                                  <p>Check in Detail</p>
                                )}
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
                                defaultChecked={
                                  props.filteredData.stepSix.isDone
                                }
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
                                <p>{props.filteredData.stepSeven.startDate}</p>
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
                                  <p>{props.filteredData.stepSeven.endDate}</p>
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
        </form>
        <div className="shipment__bottom">
          <button onClick={editBtnHandler}>Edit</button>
          <button onClick={deleteBtnHandler}>Delete</button>
        </div>
      </>
    );
  }
};

export default Shipment;
