import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import "./TypeSelector.css";

// -----TypeSelector-Components----- //
const TypeSelector = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [initial, setInitial] = useState(true);
  const [selectedItem, setSelectedItem] = useState("All");
  const [clicked, setClicked] = useState(false);

  const showDropdownHandler = () => {
    setShowDropdown(!showDropdown);
    setInitial(false);
  };

  const selectItemHandler = (event) => {
    setSelectedItem(event.target.id);
    setShowDropdown(!showDropdown);
    props.onChange(event.target.id);
  };

  const blurHandler = () => {
    setShowDropdown(!showDropdown);
    setInitial(false);
  };

  if (props.type === "get") {
    return (
      <>
        <div
          className={!showDropdown ? "select" : "select-click"}
          onClick={showDropdownHandler}
          tabIndex={clicked ? -1 : 0}
          {...(clicked ? {} : {onBlur: blurHandler})}
        >
          <h2 className="select__header">{selectedItem}</h2>
          <FontAwesomeIcon
            className={
              !showDropdown && initial
                ? "select__arrow"
                : showDropdown && !initial
                ? "select__arrow show"
                : "select__arrow hide"
            }
            icon={showDropdown ? faCaretUp : faCaretDown}
            size="lg"
            style={{ color: "#000000" }}
          />
        </div>
        <ul
          className={
            !showDropdown ? "select__dropdown__hide" : "select__dropdown__show"
          }
          onMouseEnter={() => {setClicked(true)}}
          onMouseLeave={() => {setClicked(false)}}
        >
          <li className={"All" === selectedItem ? "this-type" : ""} onClick={selectItemHandler} id="All">
            All
          </li>
          <li className={"Import" === selectedItem ? "this-type" : ""} onClick={selectItemHandler} id="Import">
            Import
          </li>
          <li className={"Export" === selectedItem ? "this-type" : ""} onClick={selectItemHandler} id="Export">
            Export
          </li>
        </ul>
      </>
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
