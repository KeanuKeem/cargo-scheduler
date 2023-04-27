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
      {isPref && <PrefSetting />}
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
