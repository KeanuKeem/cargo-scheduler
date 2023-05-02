import { useState, useEffect, useContext } from "react";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

import SelectContext from "../../store/select-context";

import "./PrefSetting.css";
import ErrorPopup from "./ErrorPopup";

const PrefSetting = (props) => {
  const ctx = useContext(SelectContext);

  const stageOneText = "(A/N or B/C)";
  const stageTwoText = "(Invoie)";
  const stageThreeText = "(D/O or B/L)";
  const stageFourText = "(Outturn or Check in)";
  const stageFiveText = "(Customs Clearance)";
  const stageSixText = "(Delivery)";
  const stageSevenStartText = "(Storage Start)";
  const stageSevenEndText = "(Storage End)";
  const completeText = "(All done)";


  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isError, setIsError] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const savePrefHandler = async (event) => {
    event.preventDefault();
    const prefData = {
      fontBase: props.fontBase,
      backBase: props.backBase,
      fontOne: props.fontOne,
      backOne: props.backOne,
      fontTwo: props.fontTwo,
      backTwo: props.backTwo,
      fontThree: props.fontThree,
      backThree: props.backThree,
      fontFour: props.fontFour,
      backFour: props.backFour,
      fontFive: props.fontFive,
      backFive: props.backFive,
      fontSix: props.fontSix,
      backSix: props.backSix,
      fontSevenStart: props.fontSevenStart,
      backSevenStart: props.backSevenStart,
      fontSevenEnd: props.fontSevenEnd,
      backSevenEnd: props.backSevenEnd,
      fontComplete: props.fontComplete,
      backComplete: props.backComplete
    };
    await axios
      .patch("https://cargo-scheduler.onrender.com/api/user/edit/pref", prefData, {
        headers: { Authorization: "Bearer " + ctx.token },
      })
      .then((result) => {
        setPopupMessage(result.data);
        setIsSuccessful(true);
      })
      .catch((err) => {
        setPopupMessage(err.response.data);
        setIsError(true);
      });
  };

  return (
    <div className="pref__setting">
      {isSuccessful && (
        <ErrorPopup
          text={popupMessage}
          onClick={() => {
            props.onClose();
          }}
        />
      )}
      {isError && (
        <ErrorPopup
          text={popupMessage}
          onClick={() => {
            setIsError(false);
          }}
        />
      )}
      <div className="pref__setting__title">
        <h3>Preference Setting</h3>
        <p>Stage completion display colours</p>
      </div>
      <form onSubmit={savePrefHandler}>
        <div className="pref__setting__edit">
          <button type="submit">
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </div>
        <div className="pref__setting__list">
          <p></p>
          <p>Font</p>
          <p>Background</p>
        </div>
        <div className="pref__setting__list">
          <p>Base: </p>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.fontBase}
              onChange={(event) => {
                props.setFontBase(event.target.value);
              }}
            />
          </p>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.backBase}
              onChange={(event) => {
                props.setBackBase(event.target.value);
              }}
            />
          </p>
        </div>
        <div className="pref__setting__list">
          <div className="pref__setting__list-stage">
            <p>Stage One: </p>
            <p>{stageOneText}</p>
          </div>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.fontOne}
              onChange={(event) => {
                props.setFontOne(event.target.value);
              }}
            />
          </p>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.backOne}
              onChange={(event) => {
                props.setBackOne(event.target.value);
              }}
            />
          </p>
        </div>
        <div className="pref__setting__list">
          <div className="pref__setting__list-stage">
            <p>Stage Two: </p>
            <p>{stageTwoText}</p>
          </div>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.fontTwo}
              onChange={(event) => {
                props.setFontTwo(event.target.value);
              }}
            />
          </p>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.backTwo}
              onChange={(event) => {
                props.setBackTwo(event.target.value);
              }}
            />
          </p>
        </div>
        <div className="pref__setting__list">
          <div className="pref__setting__list-stage">
            <p>Stage Three: </p>
            <p>{stageThreeText}</p>
          </div>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.fontThree}
              onChange={(event) => {
                props.setFontThree(event.target.value);
              }}
            />
          </p>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.backThree}
              onChange={(event) => {
                props.setBackThree(event.target.value);
              }}
            />
          </p>
        </div>
        <div className="pref__setting__list">
          <div className="pref__setting__list-stage">
            <p>Stage Four: </p>
            <p>{stageFourText}</p>
          </div>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.fontFour}
              onChange={(event) => {
                props.setFontFour(event.target.value);
              }}
            />
          </p>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.backFour}
              onChange={(event) => {
                props.setBackFour(event.target.value);
              }}
            />
          </p>
        </div>
        <div className="pref__setting__list">
          <div className="pref__setting__list-stage">
            <p>Stage Five: </p>
            <p>{stageFiveText}</p>
          </div>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.fontFive}
              onChange={(event) => {
                props.setFontFive(event.target.value);
              }}
            />
          </p>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.backFive}
              onChange={(event) => {
                props.setBackFive(event.target.value);
              }}
            />
          </p>
        </div>
        <div className="pref__setting__list">
          <div className="pref__setting__list-stage">
            <p>Stage Six: </p>
            <p>{stageSixText}</p>
          </div>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.fontSix}
              onChange={(event) => {
                props.setFontSix(event.target.value);
              }}
            />
          </p>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.backSix}
              onChange={(event) => {
                props.setBackSix(event.target.value);
              }}
            />
          </p>
        </div>
        <div className="pref__setting__list">
          <div className="pref__setting__list-stage">
            <p>Stage Seven Start: </p>
            <p>{stageSevenStartText}</p>
          </div>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.fontSevenStart}
              onChange={(event) => {
                props.setFontSevenStart(event.target.value);
              }}
            />
          </p>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.backSevenStart}
              onChange={(event) => {
                props.setBackSevenStart(event.target.value);
              }}
            />
          </p>
        </div>
        <div className="pref__setting__list">
          <div className="pref__setting__list-stage">
            <p>Stage Seven End: </p>
            <p>{stageSevenEndText}</p>
          </div>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.fontSevenEnd}
              onChange={(event) => {
                props.setFontSevenEnd(event.target.value);
              }}
            />
          </p>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.backSevenEnd}
              onChange={(event) => {
                props.setBackSevenEnd(event.target.value);
              }}
            />
          </p>
        </div>
        <div className="pref__setting__list">
          <div className="pref__setting__list-stage">
            <p>Complete: </p>
            <p>{completeText}</p>
          </div>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.fontComplete}
              onChange={(event) => {
                props.setFontComplete(event.target.value);
              }}
            />
          </p>
          <p>
            <input
              className="pref__setting__list__colour"
              type="color"
              defaultValue={props.backComplete}
              onChange={(event) => {
                props.setBackComplete(event.target.value);
              }}
            />
          </p>
        </div>
      </form>
    </div>
  );
};

export default PrefSetting;
