import { useState } from "react";
import axios from "axios";

import MenuTopBar from "./MenuTopBar";
import BtnModal from "./BtnModal";
import LoginInput from "./LoginInput";
import LoginBtn from "./LoginBtn";
import FindUsernameSuccessful from "./FindUsernameSuccessful";

import "./FindUsername.css";

const FindUsername = (props) => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const stageOneSubmitHandler = async (event) => {
    event.preventDefault();

    const usernameDetail = {
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      email: event.target.email.value,
      organisation: event.target.organisation.value,
    };

    await axios
      .post(process.env.REACT_APP_BACKEND_URL + "/user/findUser", usernameDetail)
      .then((result) => {
        if (result.status === 200) {
          setIsSuccessful(true);
          setSubmitError(result.data);
        }
      })
      .catch((err) => {
        setSubmitError(err.response.data);
      });
  };

  return (
    <>
      {isSuccessful && <FindUsernameSuccessful onClose={props.onClose} />}
      <BtnModal minimised={props.minimised}>
        <MenuTopBar onClose={props.onClose} onMinimise={props.onMinimise} />
        <h2 className="findUser__header">Find your Username!</h2>
        <p className="findUser__text">
          If the details are matched up, we will send you the details to your
          email!
        </p>
        {submitError !== "" && <p className="findUser__error">{submitError}</p>}
        <form className="findUser__form" onSubmit={stageOneSubmitHandler}>
          <div className="findUser__form__flex">
            <div className="findUser__form__names">
              <LoginInput
                className="findUser__form__input-name"
                type="text"
                id="firstname"
                placeholder="First Name"
              />
              <LoginInput
                className="findUser__form__input-name"
                type="text"
                id="lastname"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="findUser__form__flex">
            <LoginInput
              className="findUser__form__input"
              type="email"
              id="email"
              placeholder="Email"
            />
          </div>

          <div className="findUser__form__flex">
            <LoginInput
              className="findUser__form__input"
              type="text"
              id="organisation"
              placeholder="Organisation"
            />
          </div>

          <div className="findUser__form__btn">
            <LoginBtn
              type="submit"
              className="loginBtn btnFour"
              placeholder="Find"
            />
          </div>
        </form>
      </BtnModal>
    </>
  );
};

export default FindUsername;
