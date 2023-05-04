// React
import React, { Fragment, useContext, useState, useEffect } from "react";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

// Context
import SelectContext from "../../../store/select-context";

// Reference Function
import { getSelectYearArray } from "../../Reference/Calendar";

// CSS
import "./YearSelector.css";

// -----YearSelector-Components----- //
const YearSelector = () => {
  const ctx = useContext(SelectContext);

  const [selectedYear, setSelectedYear] = useState(ctx.thisYear);
  const [clicked, setClicked] = useState(false);
  const [animationEnd, setAnimationEnd] = useState(false);
  const [selectYearClass, setSelectYearClass] = useState("selectYear");
  const [arrowClass, setArrowClass] = useState("selectYear__arrow");
  const [dropdownClass, setDropdownClass] = useState("selectYear__dropdown");

  const yearArray = getSelectYearArray(ctx.thisYear);

  const showDropdownYearHandler = () => {
    setSelectYearClass("selectYear-click");
    setArrowClass("selectYear__arrow show");
    setDropdownClass("selectYear__dropdown__show");
    setAnimationEnd(false);
  };

  const selectYearHandler = (event) => {
    setSelectedYear(event.target.value);
    ctx.setYear(event.target.value);
    setSelectYearClass("selectYear");
    setArrowClass("selectYear__arrow hide");
    setDropdownClass("selectYear__dropdown__hide");
    setTimeout(() => {
      setDropdownClass("selectYear__dropdown");
    }, 400);
    setAnimationEnd(false);
  };

  const blurHandler = (event) => {
    setSelectYearClass("selectYear");
    setArrowClass("selectYear__arrow hide");
    setDropdownClass("selectYear__dropdown__hide");
    setTimeout(() => {
      setDropdownClass("selectYear__dropdown");
    }, 400);
    setAnimationEnd(false);
  };

  const animationStateHandler = () => {
    setAnimationEnd(true);
  };

  useEffect(() => {
    setSelectedYear(ctx.year);
  }, [ctx.year]);

  return (
    <>
      <div
        className={selectYearClass}
        onClick={showDropdownYearHandler}
        tabIndex={clicked ? -1 : 0}
        {...(clicked ? {} : { onBlur: blurHandler })}
        onAnimationEnd={animationStateHandler}
      >
        <h2 className="selectYear__header">{selectedYear}</h2>
        <FontAwesomeIcon
          className={arrowClass}
          icon={
            arrowClass === "selectYear__arrow show" ? faCaretUp : faCaretDown
          }
          size="lg"
          style={{ color: "#000000" }}
        />
      </div>
      <ul
        className={dropdownClass}
        onMouseEnter={() => {
          setClicked(true);
        }}
        onMouseLeave={() => {
          setClicked(false);
        }}
      >
        {yearArray.map((y) => {
          return (
            <li
              className={y === selectedYear ? "this-year" : ""}
              onClick={selectYearHandler}
              key={y}
              value={y}
            >
              {y}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default YearSelector;
