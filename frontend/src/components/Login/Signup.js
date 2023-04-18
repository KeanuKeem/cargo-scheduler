import { useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

import "./Signup.css";
import LoginInput from "./LoginInput";
import LoginBtn from "./LoginBtn";
import SignupSuccessful from "./SignupSuccessful";

const Signup = (props) => {
  const [doMinimise, setDoMinimise] = useState(false);
  const [stage, setStage] = useState("one");
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [firstnameError, setFirstnameError] = useState();
  const [lastnameError, setLastnameError] = useState();
  const [organisationError, setOrganisationError] = useState();
  const [emailError, setEmailError] = useState();
  const [emailValidityError, setEmailValidityError] = useState();
  const [emailValidity, setEmailValidity] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const minimiseHandler = () => {
    props.onMinimise();
    setDoMinimise(!doMinimise);
  };

  const stageOneSubmitHandler = async (event) => {
    event.preventDefault();

    const userDetail = {
      username: event.target.username.value,
      password: event.target.password.value,
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      email: event.target.email.value,
      organisation: event.target.organisation.value,
      validity: stage,
    };

    console.log(userDetail);

    let result;
    await axios
      .post("http://localhost:5000/api/user/signup", userDetail)
      .then((response) => {
        result = response;
      })
      .catch((err) => {
        result = err;
      });
    console.log(result);
    if (result.status === 200) {
      setUsernameError(result.data.username);
      setPasswordError(result.data.password);
      setFirstnameError(result.data.firstname);
      setLastnameError(result.data.lastname);
      setOrganisationError(result.data.organisation);
      setEmailError(result.data.email);
      setStage(result.data.validity);
      setEmailValidity(true);
    } else {
      setUsernameError(result.response.data.username);
      setPasswordError(result.response.data.password);
      setFirstnameError(result.response.data.firstname);
      setLastnameError(result.response.data.lastname);
      setOrganisationError(result.response.data.organisation);
      setEmailError(result.response.data.email);
      setStage(result.response.data.validity);
    }
  };

  const stageTwoSubmitHandler = async (event) => {
    event.preventDefault();

    const userDetail = {
      username: event.target.username.value,
      password: event.target.password.value,
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      email: event.target.email.value,
      organisation: event.target.organisation.value,
      emailValidity: event.target.emailValidity.value,
      validity: stage,
    };

    let result;
    await axios
      .post("http://localhost:5000/api/user/signup", userDetail)
      .then((response) => {
        result = response;
      })
      .catch((err) => {
        result = err;
      });

    if (result.status !== 200) {
      setUsernameError(result.response.data.username);
      setPasswordError(result.response.data.password);
      setFirstnameError(result.response.data.firstname);
      setLastnameError(result.response.data.lastname);
      setOrganisationError(result.response.data.organisation);
      setEmailError(result.response.data.email);
      setEmailValidityError(result.response.data.emailValidity);
    } else {
      setIsSuccessful(true);
    }
  };

  return (
    <>
      {isSuccessful && <SignupSuccessful onClose={props.onClose} />}
      <div
        className={
          !props.minimised
            ? "signup"
            : props.minimised && doMinimise
            ? "signup-minimised"
            : "signup-minimised-back"
        }
      >
        <div className="signup__top-bar">
          <div className="signup__top-btn">
            <FontAwesomeIcon
              className="signup__top-bar__close"
              icon={faCircleXmark}
              onClick={props.onClose}
            />
            <FontAwesomeIcon
              className="signup__top-bar__minimise"
              icon={faCircleMinus}
              onClick={minimiseHandler}
            />
            <FontAwesomeIcon
              className="signup__top-bar__maximise"
              icon={faCircleXmark}
            />
          </div>
        </div>
        <h2 className="signup__header">Welcome to Cargo Scheduler</h2>
        <form
          className="signup__form"
          onSubmit={
            stage === "one" ? stageOneSubmitHandler : stageTwoSubmitHandler
          }
        >
          <div className="signup__form__flex">
            <LoginInput
              className="signup__form__input"
              type="text"
              id="username"
              placeholder="Username"
            />
            <p className="signup__form__error">{usernameError}</p>
          </div>

          <div className="signup__form__flex">
            <LoginInput
              className="signup__form__input"
              type="password"
              id="password"
              placeholder="Password"
            />
            <p className="signup__form__error">{passwordError}</p>
          </div>

          <div className="signup__form__flex">
            <div className="signup__form__names">
              <LoginInput
                className="signup__form__input-name"
                type="text"
                id="firstname"
                placeholder="First Name"
              />
              <LoginInput
                className="signup__form__input-name"
                type="text"
                id="lastname"
                placeholder="Last Name"
              />
            </div>
            <div className="signup__form__errors">
              <p className="signup__form__error">{firstnameError}</p>
              <p className="signup__form__error">{lastnameError}</p>
            </div>
          </div>

          <div className="signup__form__flex">
            <LoginInput
              className="signup__form__input"
              type="email"
              id="email"
              placeholder="Email"
            />
            <p className="signup__form__error">{emailError}</p>
          </div>

          <div className="signup__form__flex">
            <LoginInput
              className="signup__form__input"
              type="text"
              id="organisation"
              placeholder="Organisation"
            />
            <p className="signup__form__error">{organisationError}</p>
          </div>

          {emailValidity && (
            <div className="signup__form__flex">
              <LoginInput
                className="signup__form__input"
                type="text"
                id="emailValidity"
                placeholder="Email Validation Code"
              />
              <p className="signup__form__error">{emailError}</p>
            </div>
          )}

          <div className="signup__form__btn">
            <LoginBtn
              type="submit"
              className="loginBtn btnFour"
              placeholder="Join"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
