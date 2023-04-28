import { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPen,
  faFilePen,
  faRightFromBracket,
  faCircleXmark,
  faCircleChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import PrefSetting from "../Profile/PrefSetting";
import UserSetting from "../Profile/UserSetting";
import ErrorPopup from "../Profile/ErrorPopup";

import SelectContext from "../../store/select-context";

import "./Profile.css";

const ProfileModal = (props) => {
  const [isUser, setIsUser] = useState(false);
  const [isPref, setIsPref] = useState(false);
  const [isUserHover, setIsUserHover] = useState(false);
  const [isPrefHover, setIsPrefHover] = useState(false);
  const [isLogoutHover, setIsLogoutHover] = useState(false);

  const profileCloseHandler = () => {
    props.setOnProfile(false);
    setIsUser(false);
    setIsPref(false);
  };

  const profileBackHandler = () => {
    setIsUser(false);
    setIsPref(false);
    setIsUserHover(false);
    setIsPrefHover(false);
  };

  useEffect(() => {
    setIsUserHover(false);
    setIsPrefHover(false);
    setIsLogoutHover(false);
  }, [isUser, isPref]);

  return (
    <div className="profile">
      {props.isError && <ErrorPopup text={props.popupMessage} />}
      <div className="profile__top-bar">
        <div className="profile__top-bar__item">
          <FontAwesomeIcon
            className="profile__top-bar__exit"
            onClick={profileCloseHandler}
            icon={faCircleXmark}
          />
          {isUser ? (
            <FontAwesomeIcon
              className="profile__top-bar__back"
              onClick={profileBackHandler}
              icon={faCircleChevronLeft}
            />
          ) : (
            isPref && (
              <FontAwesomeIcon
                className="profile__top-bar__back"
                onClick={profileBackHandler}
                icon={faCircleChevronLeft}
              />
            )
          )}
        </div>
      </div>
      {isPref && (
        <PrefSetting
          fontBase={props.fontBase}
          backBase={props.backBase}
          fontOne={props.fontOne}
          backOne={props.backOne}
          fontTwo={props.fontTwo}
          backTwo={props.backTwo}
          fontThree={props.fontThree}
          backThree={props.backThree}
          fontFour={props.fontFour}
          backFour={props.backFour}
          fontFive={props.fontFive}
          backFive={props.backFive}
          fontSix={props.fontSix}
          backSix={props.backSix}
          fontSevenStart={props.fontSevenStart}
          backSevenStart={props.backSevenStart}
          fontSevenEnd={props.fontSevenEnd}
          backSevenEnd={props.backSevenEnd}
          setFontBase={props.setFontBase}
          setBackBase={props.setBackBase}
          setFontOne={props.setFontOne}
          setBackOne={props.setBackOne}
          setFontTwo={props.setFontTwo}
          setBackTwo={props.setBackTwo}
          setFontThree={props.setFontThree}
          setBackThree={props.setBackThree}
          setFontFour={props.setFontFour}
          setBackFour={props.setBackFour}
          setFontFive={props.setFontFive}
          setBackFive={props.setBackFive}
          setFontSix={props.setFontSix}
          setBackSix={props.setBackSix}
          setFontSevenStart={props.setFontSevenStart}
          setBackSevenStart={props.setBackSevenStart}
          setFontSevenEnd={props.setFontSevenEnd}
          setBackSevenEnd={props.setBackSevenEnd}
          onClose={profileBackHandler}
        />
      )}
      {isUser && (
        <UserSetting
          onClose={profileCloseHandler}
          isUser={isUser}
          firstname={props.firstname}
          lastname={props.lastname}
          organisation={props.organisation}
        />
      )}
      {!isUser && !isPref && (
        <>
          <div className="profile__top">
            <h3>Hi {props.firstname}! How are you today?</h3>
          </div>

          <div className="profile__items">
            <div
              className="profile__item"
              onMouseEnter={() => {
                setIsUserHover(true);
              }}
              onMouseLeave={() => {
                setIsUserHover(false);
              }}
              onClick={() => {
                setIsUser(true);
              }}
            >
              <FontAwesomeIcon
                className={isUserHover ? "profile__item-hovered" : ""}
                icon={faUserPen}
              />
            </div>
            <div
              className="profile__item"
              onMouseEnter={() => {
                setIsPrefHover(true);
              }}
              onMouseLeave={() => {
                setIsPrefHover(false);
              }}
              onClick={() => {
                setIsPref(true);
              }}
            >
              <FontAwesomeIcon
                icon={faFilePen}
                className={isPrefHover ? "profile__item-hovered" : ""}
              />
            </div>
            <div
              className="profile__item"
              onMouseEnter={() => {
                setIsLogoutHover(true);
              }}
              onMouseLeave={() => {
                setIsLogoutHover(false);
              }}
            >
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className={isLogoutHover ? "profile__item-hovered" : ""}
                onClick={props.onLogOut}
                alt="logout"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Profile = (props) => {
  const ctx = useContext(SelectContext);

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [organisation, setOrganisation] = useState();
  const [fontBase, setFontBase] = useState("#ffffff");
  const [backBase, setBackBase] = useState("#000000");
  const [fontOne, setFontOne] = useState("#ffffff");
  const [backOne, setBackOne] = useState("#000000");
  const [fontTwo, setFontTwo] = useState("#ffffff");
  const [backTwo, setBackTwo] = useState("#000000");
  const [fontThree, setFontThree] = useState("#ffffff");
  const [backThree, setBackThree] = useState("#000000");
  const [fontFour, setFontFour] = useState("#ffffff");
  const [backFour, setBackFour] = useState("#000000");
  const [fontFive, setFontFive] = useState("#ffffff");
  const [backFive, setBackFive] = useState("#000000");
  const [fontSix, setFontSix] = useState("#ffffff");
  const [backSix, setBackSix] = useState("#000000");
  const [fontSevenStart, setFontSevenStart] = useState("#ffffff");
  const [backSevenStart, setBackSevenStart] = useState("#000000");
  const [fontSevenEnd, setFontSevenEnd] = useState("#ffffff");
  const [backSevenEnd, setBackSevenEnd] = useState("#000000");
  const [isError, setIsError] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user", {
        headers: { Authorization: "Bearer " + ctx.token },
      });
      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
      setOrganisation(response.data.organisation);
      setFontBase(response.data.fontBase);
      setBackBase(response.data.backBase);
      setFontOne(response.data.fontOne);
      setBackOne(response.data.backOne);
      setFontTwo(response.data.fontTwo);
      setBackTwo(response.data.backTwo);
      setFontThree(response.data.fontThree);
      setBackThree(response.data.backThree);
      setFontFour(response.data.fontFour);
      setBackFour(response.data.backFour);
      setFontFive(response.data.fontFive);
      setBackFive(response.data.backFive);
      setFontSix(response.data.fontSix);
      setBackSix(response.data.backSix);
      setFontSevenStart(response.data.fontSevenStart);
      setBackSevenStart(response.data.backSevenStart);
      setFontSevenEnd(response.data.fontSevenEnd);
      setBackSevenEnd(response.data.backSevenEnd);
    } catch (err) {
      setPopupMessage(err.response.data);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [props.onProfile]);

  return (
    <>
      {ReactDOM.createPortal(
        <ProfileModal
          firstname={firstname}
          lastname={lastname}
          organisation={organisation}
          fontBase={fontBase}
          backBase={backBase}
          fontOne={fontOne}
          backOne={backOne}
          fontTwo={fontTwo}
          backTwo={backTwo}
          fontThree={fontThree}
          backThree={backThree}
          fontFour={fontFour}
          backFour={backFour}
          fontFive={fontFive}
          backFive={backFive}
          fontSix={fontSix}
          backSix={backSix}
          fontSevenStart={fontSevenStart}
          backSevenStart={backSevenStart}
          fontSevenEnd={fontSevenEnd}
          backSevenEnd={backSevenEnd}
          setFontBase={setFontBase}
          setBackBase={setBackBase}
          setFontOne={setFontOne}
          setBackOne={setBackOne}
          setFontTwo={setFontTwo}
          setBackTwo={setBackTwo}
          setFontThree={setFontThree}
          setBackThree={setBackThree}
          setFontFour={setFontFour}
          setBackFour={setBackFour}
          setFontFive={setFontFive}
          setBackFive={setBackFive}
          setFontSix={setFontSix}
          setBackSix={setBackSix}
          setFontSevenStart={setFontSevenStart}
          setBackSevenStart={setBackSevenStart}
          setFontSevenEnd={setFontSevenEnd}
          setBackSevenEnd={setBackSevenEnd}
          isError={isError}
          popupMessage={popupMessage}
          setOnProfile={props.setOnProfile}
          onLogOut={props.onLogOut}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Profile;
