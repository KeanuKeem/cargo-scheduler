import { useState, useContext } from "react";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

import SelectContext from "../../store/select-context";

import "./UserSetting.css";
import ErrorPopup from "./ErrorPopup";

const UserSetting = (props) => {
  const ctx = useContext(SelectContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const popupBtnHandler = () => {
    setIsError(false);
  };

  const updateFormHandler = async (event) => {
    event.preventDefault();
    try {
      const userData = {
        firstname: event.target.firstname.value,
        lastname: event.target.lastname.value,
        organisation: event.target.organisation.value,
        password: event.target.password.value,
      };
      const response = await axios.patch(
        "http://localhost:5000/api/user/edit/profile",
        userData,
        { headers: { Authorization: "Bearer " + ctx.token } }
      );
      setPopupMessage(response.data);
      setIsSuccess(true);
    } catch (err) {
      setPopupMessage(err.response.data);
      setIsError(true);
    }
  };

  return (
    <div className="user__setting">
      {isSuccess && (
        <ErrorPopup onClick={props.onClose} text={popupMessage} />
      )}
      {isError && <ErrorPopup onClick={popupBtnHandler} text={popupMessage} />}
      <div className="user__setting__heading">
        <h3>User Profile Setting</h3>
      </div>
      <div className="user__setting__items">
        <form onSubmit={updateFormHandler}>
          <div className="user__setting__item">
            <p>First Name:</p>
            {!isEdit ? (
              <p>{props.firstname}</p>
            ) : (
              <input
                type="text"
                id="firstname"
                defaultValue={props.firstname}
              />
            )}
          </div>
          <div className="user__setting__item">
            <p>Last Name:</p>
            {!isEdit ? (
              <p>{props.lastname}</p>
            ) : (
              <input
                type="text"
                id="lastname"
                defaultValue={props.lastname}
              />
            )}
          </div>
          <div className="user__setting__item">
            <p>Organisation Name:</p>
            {!isEdit ? (
              <p>{props.organisation}</p>
            ) : (
              <input
                type="text"
                id="organisation"
                defaultValue={props.organisation}
              />
            )}
          </div>
          {isEdit && (
            <div className="user__setting__item">
              <p>Password:</p>
              <input type="password" id="password" />
            </div>
          )}

          {isEdit && (
            <div className="user__setting__bottom">
              <button
                type={isEdit ? "submit" : ""}
                className="user__setting__bottom__btn"
              >
                <FontAwesomeIcon icon={faFloppyDisk} />
              </button>
            </div>
          )}
        </form>
        {!isEdit && (
          <div className="user__setting__bottom">
            <button
              className="user__setting__bottom__btn"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSetting;
