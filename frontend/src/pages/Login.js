import { useState } from "react";

import "./Login.css";

const Login = () => {
  const [btnClicked, setBtnClicked] = useState(false);

  const btnHandler = () => {
    
  };

  return (
    <div className="back">
      <div className="login">
        <form className="login__form">
          <div className="login__form__input">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
          </div>
          <div className="login__form__btn">
            <button className="login__btn" type="submit">
              Log In
            </button>
          </div>
        </form>

        <div className="login__btns">
          <button className="login__btn">Sign Up</button>
          <button className="login__btn">Find Username</button>
          <button className="login__btn">Find Password</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
