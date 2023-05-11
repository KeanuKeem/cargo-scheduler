import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import "./TypeSelector.css";

// -----TypeSelector-Components----- //
const TypeSelector = (props) => {
  const [selectedItem, setSelectedItem] = useState(props.defaultText);
  const [clicked, setClicked] = useState(false);
  const [selectClass, setSelectClass] = useState("select");
  const [arrowClass, setArrowClass] = useState("select__arrow");
  const [dropdownClass, setDropdownClass] = useState("select__dropdown");
  const [animationEnd, setAnimationEnd] = useState(false);

  const showDropdownHandler = () => {
    setSelectClass("select-click");
    setArrowClass("select__arrow show");
    setDropdownClass("select__dropdown__show");
    setAnimationEnd(false);
  };

  const selectItemHandler = (event) => {
    setSelectedItem(event.target.id);
    props.onChange(event.target.id);
    setSelectClass("select");
    setArrowClass("select__arrow hide");
    setDropdownClass("select__dropdown__hide");
    setTimeout(() => {
      setDropdownClass("select__dropdown");
    }, 400);
    setAnimationEnd(false);
  };

  const blurHandler = () => {
    setSelectClass("select");
    setArrowClass("select__arrow hide");
    setDropdownClass("select__dropdown__hide");
    setTimeout(() => {
      setDropdownClass("select__dropdown");
    }, 400);
  };

  const animationStateHandler = () => {
    setAnimationEnd(true);
  };

  if (props.type === "get") {
    return (
      <div>
        <div
          className={selectClass}
          onClick={showDropdownHandler}
          tabIndex={clicked ? -1 : 0}
          {...(clicked ? {} : { onBlur: blurHandler })}
          onAnimationEnd={animationStateHandler}
        >
          <h2 className="select__header">{selectedItem}</h2>
          <FontAwesomeIcon
            className={arrowClass}
            icon={arrowClass === "select__arrow show" ? faCaretUp : faCaretDown}
            size="lg"
            style={{ color: "#000000" }}
          />
        </div>
        <ul
          className={dropdownClass + " " + props.className}
          onMouseEnter={() => {
            setClicked(true);
          }}
          onMouseLeave={() => {
            setClicked(false);
          }}
        >
          <li
            className={"All" === selectedItem ? "this-type" : ""}
            onClick={selectItemHandler}
            id="All"
          >
            All
          </li>
          <li
            className={"Import" === selectedItem ? "this-type" : ""}
            onClick={selectItemHandler}
            id="Import"
          >
            Import
          </li>
          <li
            className={"Export" === selectedItem ? "this-type" : ""}
            onClick={selectItemHandler}
            id="Export"
          >
            Export
          </li>
        </ul>
      </div>
    );
  }
  if (props.type === "bkrType") {
    return (
      <select
        className={props.className}
        onChange={props.typeHandler}
        name="bkrType"
        id="bkrType"
      >
        <option value={props.default} hidden>
          {props.default}
        </option>
        <option value="AIR">AIR</option>
        <option value="SEA">SEA</option>
      </select>
    );
  }

  if (props.type === "add") {
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
        <option value="FAK">FAK</option>
        <option value="FCL">FCL</option>
        <option value="LCL">LCL</option>
        <option value="BKR">Brokerage</option>
        <option value="AIR">AIR</option>
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
        {props.default === "FAK" && <option value="FAK">FAK</option>}
        {props.default === "AIR" && <option value="AIR">AIR</option>}
        {props.default !== "FAK" && props.default !== "AIR" && (
          <option value="FCL">FCL</option>
        )}
        {props.default !== "FAK" && props.default !== "AIR" && (
          <option value="LCL">LCL</option>
        )}
        {props.default !== "FAK" && props.default !== "AIR" && (
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

  if (props.type === "getType") {
    return (
      <div>
        <div
          className={selectClass}
          onClick={showDropdownHandler}
          tabIndex={clicked ? -1 : 0}
          {...(clicked ? {} : { onBlur: blurHandler })}
          animationEnd={animationStateHandler}
        >
          <h2 className="select__header">{selectedItem}</h2>
          <FontAwesomeIcon
            className={arrowClass}
            icon={arrowClass === "select__arrow show" ? faCaretUp : faCaretDown}
            size="lg"
            style={{ color: "#000000" }}
          />
        </div>
        <ul
          className={dropdownClass + " " + props.className}
          onMouseEnter={() => {
            setClicked(true);
          }}
          onMouseLeave={() => {
            setClicked(false);
          }}
        >
          {props.allShow && (
            <li
              className={
                "All" === selectedItem || "Type" === selectedItem
                  ? "this-type"
                  : ""
              }
              onClick={selectItemHandler}
              id="Type"
            >
              All
            </li>
          )}
          <li
            className={"BKR" === selectedItem ? "this-type" : ""}
            onClick={selectItemHandler}
            id="BKR"
          >
            BKR
          </li>
          <li
            className={"FAK" === selectedItem ? "this-type" : ""}
            onClick={selectItemHandler}
            id="FAK"
          >
            FAK
          </li>
          <li
            className={"FCL" === selectedItem ? "this-type" : ""}
            onClick={selectItemHandler}
            id="FCL"
          >
            FCL
          </li>
          <li
            className={"LCL" === selectedItem ? "this-type" : ""}
            onClick={selectItemHandler}
            id="LCL"
          >
            LCL
          </li>
          <li
            className={"AIR" === selectedItem ? "this-type" : ""}
            onClick={selectItemHandler}
            id="AIR"
          >
            AIR
          </li>
        </ul>
      </div>
    );
  }
};

export default TypeSelector;
