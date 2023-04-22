import LoginBtn from "./LoginBtn";

import "./Successful.css";

const FindUsernameSuccessful = (props) => {
  return (
    <>
      <div>
        <div className="successful">
          <div className="successful__header">
            <h1>We have sent you an email!</h1>
          </div>
          <div className="successful__body">
            <p>We have send you an email with the username.</p>
            <p>Please try with the username given!</p>
          </div>
          <div className="successful__btn">
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

export default FindUsernameSuccessful;