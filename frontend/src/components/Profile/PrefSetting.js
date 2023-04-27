import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import "./PrefSetting.css";

const PrefSetting = () => {
  const stageOneText = "(A/N or B/C)";
  const stageTwoText = "(Invoie)";
  const stageThreeText = "(D/O or B/L)";
  const stageFourText = "(Outturn or Check in)";
  const stageFiveText = "(Customs Clearance)";
  const stageSixText = "(Delivery)";
  const stageSevenStartText = "(Storage Start)";
  const stageSevenEndText = "(Storage End)";

  return (
    <div className="pref__setting">
      <div className="pref__setting__title">
        <h3>Preference Setting</h3>
        <p>Stage completion display colours</p>
      </div>
      <div className="pref__setting__list">
        <FontAwesomeIcon icon={faPenToSquare} />
        <p>Base: </p>
        <p>Color</p>
      </div>
      <div className="pref__setting__list">
        <FontAwesomeIcon icon={faPenToSquare} />
        <div className="pref__setting__list-stage">
          <p>Stage One: </p>
          <p>{stageOneText}</p>
        </div>
        <p>Color</p>
      </div>
      <div className="pref__setting__list">
        <FontAwesomeIcon icon={faPenToSquare} />
        <div className="pref__setting__list-stage">
          <p>Stage Two: </p>
          <p>{stageTwoText}</p>
        </div>
        <p>Color</p>
      </div>
      <div className="pref__setting__list">
        <FontAwesomeIcon icon={faPenToSquare} />
        <div className="pref__setting__list-stage">
          <p>Stage Three: </p>
          <p>{stageThreeText}</p>
        </div>
        <p>Color</p>
      </div>
      <div className="pref__setting__list">
        <FontAwesomeIcon icon={faPenToSquare} />
        <div className="pref__setting__list-stage">
          <p>Stage Four: </p>
          <p>{stageFourText}</p>
        </div>
        <p>Color</p>
      </div>
      <div className="pref__setting__list">
        <FontAwesomeIcon icon={faPenToSquare} />
        <div className="pref__setting__list-stage">
          <p>Stage Five: </p>
          <p>{stageFiveText}</p>
        </div>
        <p>Color</p>
      </div>
      <div className="pref__setting__list">
        <FontAwesomeIcon icon={faPenToSquare} />
        <div className="pref__setting__list-stage">
          <p>Stage Six: </p>
          <p>{stageSixText}</p>
        </div>
        <p>Color</p>
      </div>
      <div className="pref__setting__list">
        <FontAwesomeIcon icon={faPenToSquare} />
        <div className="pref__setting__list-stage">
          <p>Stage Seven Start: </p>
          <p>{stageSevenStartText}</p>
        </div>
        <p>Color</p>
      </div>
      <div className="pref__setting__list">
        <FontAwesomeIcon icon={faPenToSquare} />
        <div className="pref__setting__list-stage">
          <p>Stage Seven End: </p>
          <p>{stageSevenEndText}</p>
        </div>
        <p>Color</p>
      </div>
    </div>
  );
};

export default PrefSetting;
