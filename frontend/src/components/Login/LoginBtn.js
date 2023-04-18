import "./LoginBtn.css";

const LoginBtn = (props) => {
  return (
    <button
      type={props.type}
      className={props.className}
      onClick={props.onClick}
    >
      {props.placeholder}
    </button>
  );
};

export default LoginBtn;
