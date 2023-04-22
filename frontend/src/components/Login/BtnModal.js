import "./BtnModal.css";

const BtnModal = (props) => {
  return (
    <div
      className={
        !props.minimised
          ? "BtnModal"
          : props.minimised && props.doMinimise
          ? "BtnModal-minimised"
          : "BtnModal-minimised-back"
      }
    >
      {props.children}
    </div>
  );
};

export default BtnModal;
