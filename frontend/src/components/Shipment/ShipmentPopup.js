import "./ShipmentPopup.css";

const ShipmentPopup = (props) => {
  if (props.type === "notification") {
    return (
      <div className={"popup " + props.className}>
        <div className="popup__top-toggle"></div>
        <p className="popup__text">{props.text}</p>
        <button onClick={props.onClick} className="popup__btn">
          {props.button}
        </button>
      </div>
    );
  }
  if (props.type === "select") {
    return (
      <div className={"popup " + props.className}>
        <div className="popup__top-toggle"></div>
        <p className="popup__text">{props.text}</p>
        <button onClick={props.onClickOne} className="popup__btn-one">
          {props.buttonOne}
        </button>
        <button onClick={props.onClickTwo} className="popup__btn-two">
          {props.buttonTwo}
        </button>
      </div>
    );
  }
};

export default ShipmentPopup;
