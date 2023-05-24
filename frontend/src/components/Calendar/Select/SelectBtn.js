import "./SelectBtn.css";

const SelectBtn = (props) => {
  return (
    <button
      type={props.type}
      className={"selectBtn " + props.className}
      onClick={props.onClick ? props.onClick : null}
    >
      {props.children}
    </button>
  );
};

export default SelectBtn;
