import LoginBtn from "./LoginBtn";

import "./SignupSuccessful.css";

const SignupSuccessful = (props) => {
  return (
    <>
      <div>
        <div className="signupOk">
          <div className="signupOk__header">
            <h1>SuccessFully Signed Up!</h1>
          </div>
          <div className="signupOk__body">
            <p>Thanks for signing up!</p>
            <p>Please go ahead and log in!</p>
          </div>
          <div className="signupOk__btn">
            <LoginBtn
              onClick={props.onClose}
              className="loginBtn btnTwo"
              placeholder="Okay!"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupSuccessful;