import "./SelectBtn.css";

const SelectBtn = (props) => {
  return (
    <button type={props.type} className="selectBtn" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default SelectBtn;
