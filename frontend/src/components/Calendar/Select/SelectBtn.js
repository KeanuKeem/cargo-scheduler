import "./SelectBtn.css";

const SelectBtn = (props) => {
  return (
    <button className="selectBtn" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default SelectBtn;
