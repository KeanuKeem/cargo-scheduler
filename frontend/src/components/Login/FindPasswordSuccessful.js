import LoginBtn from "./LoginBtn";

import "./Successful.css";

const FindPasswordSuccesfful = (props) => {
  return (
    <>
      <div>
        <div className="successful">
          <div className="successful__header">
            <h1>Password has been renewed!</h1>
          </div>
          <div className="successful__body">
            <p>We have set your new password as given!</p>
            <p>Please try with the new password!</p>
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

export default FindPasswordSuccesfful;