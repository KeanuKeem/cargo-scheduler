import { useState, useReducer, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import SelectContext from "../store/select-context";
import Signup from "../components/Login/Signup";
import LoginInput from "../components/Login/LoginInput";
import LoginBtn from "../components/Login/LoginBtn";
import FindUsername from "../components/Login/FindUsername";
import FindPassword from "../components/Login/FindPassword";
import Logging from "../components/Login/Logging";
import Message from "../components/Login/Message";

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
  if (action.type === "USER_MIN") {
    return {
      signup: state.value,
      username: action.value,
      password: state.value,
    };
  }
  if (action.type === "USER_CLOSE") {
    return {
      signup: state.value,
      username: action.value,
      password: state.value,
    };
  }
  if (action.type === "PASS_MIN") {
    return {
      signup: state.value,
      username: state.value,
      password: action.value,
    };
  }
  if (action.type === "PASS_CLOSE") {
    return {
      signup: state.value,
      username: state.value,
      password: action.value,
    };
  }
};

const Login = (props) => {
  const ctx = useContext(SelectContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isUsername, setIsUsername] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isMessage, setIsMessage] = useState(true);
  const [cookies] = useCookies(["lastVisit"]);
  const [checkbox, setCheckbox] = useState(false);
  const [isMinimised, dispatchIsMinimised] = useReducer(minimiseReducer, {
    signup: false,
    username: false,
    password: false,
  });

  useEffect(() => {
    const lastVisit = cookies.lastVisit;

    if (lastVisit) {
      const currentTime = new Date().getTime();
      const expiryTime = 24 * 60 * 60 * 1000;
      const timeRemaining = currentTime - new Date(lastVisit).getTime();

      if (timeRemaining >= expiryTime) {
        setIsMessage(true);
        document.cookie = `lastVisit=${new Date().toISOString()}; path=/;`;
      } else {
        setIsMessage(false);
      }
    } else {
      setIsMessage(true);
    }
  }, []);

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

  const findUserExitHandler = () => {
    dispatchIsMinimised({
      type: "USER_CLOSE",
      value: false,
    });
    setIsUsername(false);
  };

  const minimiseUserHandler = () => {
    dispatchIsMinimised({
      type: "USER_MIN",
      value: true,
    });
  };

  const findPassExitHandler = () => {
    dispatchIsMinimised({
      type: "PASS_CLOSE",
      value: false,
    });
    setIsPassword(false);
  };

  const minimisePassHandler = () => {
    dispatchIsMinimised({
      type: "PASS_MIN",
      value: true,
    });
  };

  return (
    <>
      {isMessage && (
        <Message
          isMessage={isMessage}
          setIsMessage={setIsMessage}
          checkbox={checkbox}
          setCheckbox={setCheckbox}
        />
      )}
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
      {isUsername && (
        <>
          {ReactDOM.createPortal(
            <div className="back" onClick={findUserExitHandler}></div>,
            document.getElementById("backdrop-root")
          )}
          {ReactDOM.createPortal(
            <FindUsername
              onClose={findUserExitHandler}
              onMinimise={minimiseUserHandler}
              findUser={isUsername}
              minimised={isMinimised.username}
            />,
            document.getElementById("overlay-root")
          )}
        </>
      )}
      {isPassword && (
        <>
          {ReactDOM.createPortal(
            <div className="back" onClick={findPassExitHandler}></div>,
            document.getElementById("backdrop-root")
          )}
          {ReactDOM.createPortal(
            <FindPassword
              onClose={findPassExitHandler}
              onMinimise={minimisePassHandler}
              findUser={isPassword}
              minimised={isMinimised.password}
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
        {props.isLoggingIn && (
          <div className="logging">
            <Logging text="Logging in.." />
          </div>
        )}
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
                className="login__form__password"
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
