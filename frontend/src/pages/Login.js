import { useState, useReducer, useContext } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

import SelectContext from "../store/select-context";
import Signup from "../components/Login/Signup";
import LoginInput from "../components/Login/LoginInput";
import LoginBtn from "../components/Login/LoginBtn";

import "./Login.css";

const minimiseReducer = (state, action) => {
  if (action.type === "SIGNUP_MIN") {
    return {
      signup: action.value,
      username: state.value,
      password: state.value,
    };
  }
  if (action.type === "SIGNUP_CLOSE") {
    return {
      signup: action.value,
      username: state.value,
      password: state.value,
    };
  }
};

const Login = (props) => {
  const ctx = useContext(SelectContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isUsername, setIsUsername] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isMinimised, dispatchIsMinimised] = useReducer(minimiseReducer, {
    signup: false,
    username: false,
    password: false,
  });

  const navigate = useNavigate();

  const signUpClickHandler = () => {
    setIsSignUp(true);
  };

  const userNameClickHandler = () => {
    setIsUsername(true);
  };

  const passwordClickHandler = () => {
    setIsPassword(true);
  };

  const signupExitHandler = () => {
    dispatchIsMinimised({
      type: "SIGNUP_CLOSE",
      value: false,
    });
    setIsSignUp(false);
  };

  const minimiseSignUpHandler = () => {
    dispatchIsMinimised({
      type: "SIGNUP_MIN",
      value: true,
    });
    setTimeout(() => {
      setIsSignUp(false);
    }, 400);
  };

  return (
    <>
      {isSignUp && (
        <>
          {ReactDOM.createPortal(
            <div className="back" onClick={signupExitHandler}></div>,
            document.getElementById("backdrop-root")
          )}
          {ReactDOM.createPortal(
            <Signup
              onClose={signupExitHandler}
              onMinimise={minimiseSignUpHandler}
              signup={isSignUp}
              minimised={isMinimised.signup}
            />,
            document.getElementById("overlay-root")
          )}
        </>
      )}
      <div
        className={
          isSignUp || isUsername || isPassword ? "back-opened" : "back"
        }
      >
        <div className="login">
          <div className="header">
            <h1>Cargo Scheduler</h1>
          </div>
          <form
            className="login__form"
            onSubmit={async (event) => {
              event.preventDefault();
              const logInOkay = await props.onLogIn(event);
              if (logInOkay) {
                navigate("/calendar");
              }
            }}
          >
            <div className="login__form__input">
              <LoginInput type="text" id="username" placeholder="Username" />
              <LoginInput
                type="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="login__form__btn">
              <LoginBtn
                type="submit"
                className="loginBtn btnFour"
                placeholder="Log In"
              />
            </div>
            {ctx.loginError !== "" && (
              <div className="login__error">
                <p>{ctx.loginError}</p>
              </div>
            )}
          </form>

          <div className="login__btns">
            <LoginBtn
              onClick={signUpClickHandler}
              className="loginBtn btnTwo"
              placeholder="Sign Up"
            />
            <LoginBtn
              onClick={userNameClickHandler}
              className="loginBtn btnTwo"
              placeholder="Find Username"
            />
            <LoginBtn
              onClick={passwordClickHandler}
              className="loginBtn btnTwo"
              placeholder="Find Password"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
