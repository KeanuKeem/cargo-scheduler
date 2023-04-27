import "./ErrorPopup.css";

const ErrorPopup = (props) => {
  return (
    <div className="profile__error-popup">
      <div className="profile__error-popup__top"></div>
      <div className="profile__error-popup__text">
        <p>{props.text}</p>
      </div>
      <div className="profile__error-popup__btn">
        <button onClick={props.onClick}> Okay!</button>
      </div>
    </div>
  );
};

export default ErrorPopup;
