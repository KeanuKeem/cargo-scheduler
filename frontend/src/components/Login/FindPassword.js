import { useState } from "react";
import axios from "axios";

import MenuTopBar from "./MenuTopBar";
import BtnModal from "./BtnModal";
import LoginInput from "./LoginInput";
import LoginBtn from "./LoginBtn";
import FindPasswordSuccessful from "./FindPasswordSuccessful";

import "./FindPassword.css";

const FindPassword = (props) => {
  const [stage, setStage] = useState("ONE");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isVerfication, setIsVerification] = useState(false);

  const stageOneSubmitHandler = async (event) => {
    event.preventDefault();

    const userDetail = {
      username: event.target.username.value,
      email: event.target.email.value,
      organisation: event.target.organisation.value,
      stage,
    };

    await axios
      .post("http://localhost:5000/api/user/findPass", userDetail)
      .then((result) => {
        if (result.status === 200) {
          setSubmitError("");
          setIsVerification(true);
          setStage(result.data);
        }
      })
      .catch((err) => {
        setSubmitError(err.response.data);
      });
  };

  const stageTwoSubmitHandler = async (event) => {
    event.preventDefault();

    const userDetail = {
      username: event.target.username.value,
      email: event.target.email.value,
      organisation: event.target.organisation.value,
      verification: event.target.verification.value,
      password: event.target.password.value,
      stage,
    };

    await axios
      .post("http://localhost:5000/api/user/findPass", userDetail)
      .then((result) => {
        if (result.status === 200) {
          setIsSuccessful(true);
          setSubmitError(result.data);
          setStage("ONE");
        }
      })
      .catch((err) => {
        console.log(err);
        setSubmitError(err.response.data);
      });
  };

  return (
    <>
      {isSuccessful && <FindPasswordSuccessful onClose={props.onClose} />}
      <BtnModal minimised={props.minimised}>
        <MenuTopBar onClose={props.onClose} onMinimise={props.onMinimise} />
        <h2 className="findPass__header">Find your Password!</h2>
        <p className="findPass__text">
          If the details are matched up, we will send you the verification code
          to change your password!
        </p>
        {submitError !== "" && <p className="findPass__error">{submitError}</p>}
        <form
          className="findPass__form"
          onSubmit={
            stage === "ONE" ? stageOneSubmitHandler : stageTwoSubmitHandler
          }
        >
          <div
            className={
              submitError
                ? "findPass__form__flex"
                : "findPass__form__flex margin"
            }
          >
            <LoginInput
              className="findPass__form__input"
              type="text"
              id="username"
              placeholder="Username"
            />
          </div>

          <div className="findPass__form__flex">
            <LoginInput
              className="findPass__form__input"
              type="email"
              id="email"
              placeholder="Email"
            />
          </div>

          <div className="findPass__form__flex">
            <LoginInput
              className="findPass__form__input"
              type="text"
              id="organisation"
              placeholder="Organisation"
            />
          </div>

          {isVerfication && (
            <>
              <div className="findPass__form__flex margin">
                <LoginInput
                  className="findPass__form__input"
                  type="text"
                  id="verification"
                  placeholder="Verrification Code"
                />
              </div>
              <div className="findPass__form__flex">
                <LoginInput
                  className="findPass__form__input"
                  type="password"
                  id="password"
                  placeholder="New Password"
                />
              </div>
            </>
          )}

          <div className="findPass__form__btn">
            <LoginBtn
              type="submit"
              className="loginBtn btnFour"
              placeholder={isVerfication ? "Submit" : "Find"}
            />
          </div>
        </form>
      </BtnModal>
    </>
  );
};

export default FindPassword;
