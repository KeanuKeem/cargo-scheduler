import "./TypeSelector.css";

// -----TypeSelector-Components----- //
const TypeSelector = (props) => {
  if (props.type === "get") {
    return (
      <select name="cargoType" id="cargoType" onChange={props.onChange}>
        <option value="All">All</option>
        <option value="Import">Import</option>
        <option value="Export">Export</option>
      </select>
    );
  }

  if (props.type === "contType") {
    return (
      <select
        className={props.className}
        onChange={props.typeHandler}
        name="contType"
        id="contType"
      >
        <option value={props.default} hidden>
          {props.default}
        </option>
        {props.default === "FCL" ||
          props.default === "LCL" ||
          props.default === "BKR" || <option value="FAK">FAK</option>}
        {props.default !== "FAK" && <option value="FCL">FCL</option>}
        {props.default !== "FAK" && <option value="LCL">LCL</option>}
        {props.default !== "FAK" && props.shipmentType !== "Export" && (
          <option value="BKR">Brokerage</option>
        )}
      </select>
    );
  }

  if (props.type === "FAK") {
    return (
      <select
        onChange={props.typeHandler}
        className={props.className}
        name="LCL"
        id="LCL"
        defaultValue={props.defaultValue}
      >
        <option value="LCL">LCL</option>
      </select>
    );
  }

  if (props.type === "cargoType") {
    return (
      <select onChange={props.typeHandler} name="cargoType" id="cargoType">
        <option value={props.default} hidden>
          {props.default}
        </option>
        <option value="Import">Import</option>
        <option value="Export">Export</option>
      </select>
    );
  }
};

export default TypeSelector;
