import LoginBtn from "./LoginBtn";

import "./Successful.css";

const SignupSuccessful = (props) => {
  return (
    <>
      <div>
        <div className="successful">
          <div className="successful__header">
            <h1>SuccessFully Signed Up!</h1>
          </div>
          <div className="successful__body">
            <p>Thanks for signing up!</p>
            <p>Please note the account expires in 24hours!</p>
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

export default SignupSuccessful;