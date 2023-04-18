import { useState } from "react";

import "./LoginInput.css";

const LoginInput = (props) => {
  const [typed, setTyped] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginClass, setLoginClass] = useState("loginInput ");
  const [passwordClass, setPasswordClass] = useState("passwordShow ");

  const inputTypehandler = (event) => {
    setTyped(event.target.value);
  };

  const passwordShowHandler = () => {
    setShowPassword(!showPassword);
  };

  const focusHandler = () => {
    if (props.type === "password") {
      if (typed === "") {
        setPasswordClass("passwordShow-focus ");
        setTimeout(() => {
          setLoginClass("loginInput-pushed ");
          setPasswordClass("passwordShow-pushed ");
        }, 300);
      }
    } else {
      if (typed === "") {
        setTimeout(() => {
          setLoginClass("loginInput-pushed ");
        }, 300);
      }
    }
  };

  const blurHandler = () => {
    if (props.type === "password") {
      if (typed === "") {
        setLoginClass("loginInput ");
        setPasswordClass("passwordShow ");
      } else {
        setLoginClass("loginInput-pushed ");
        setPasswordClass("passwordShow-pushed ");
      }
    } else {
      if (typed === "") {
        setLoginClass("loginInput ");
      } else {
        setLoginClass("loginInput-pushed ");
      }
    }
  };

  if (props.type === "password") {
    return (
      <div className="loginInput__password">
        <input
          className={loginClass + props.className}
          type={showPassword ? "text" : "password"}
          onChange={inputTypehandler}
          id={props.id}
          value={typed}
          placeholder={props.placeholder}
          onFocus={focusHandler}
          onBlur={blurHandler}
        />
        <p
          className={passwordClass}
          onClick={passwordShowHandler}
        >
          Show
        </p>
      </div>
    );
  }

  return (
    <input
      className={loginClass + props.className}
      type={props.type}
      onChange={inputTypehandler}
      id={props.id}
      value={typed}
      onFocus={focusHandler}
      onBlur={blurHandler}
      placeholder={props.placeholder}
    />
  );
};

export default LoginInput;
