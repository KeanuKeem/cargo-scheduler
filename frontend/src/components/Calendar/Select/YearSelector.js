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
  const [showDropdownYear, setShowDropdownYear] = useState(false);
  const [initialYear, setInitialYear] = useState(true);
  const [clicked, setClicked] = useState(false);

  const yearArray = getSelectYearArray(ctx.thisYear);

  const showDropdownYearHandler = () => {
    setInitialYear(false);
    setShowDropdownYear(!showDropdownYear);
  };

  const selectYearHandler = (event) => {
    setSelectedYear(event.target.value);
    ctx.setYear(event.target.value);
    setShowDropdownYear(!showDropdownYear);
  };

  const blurHandler = (event) => {
    setShowDropdownYear(false);
    setInitialYear(false);
  };

  useEffect(() => {
    setSelectedYear(ctx.year);
  }, [ctx.year]);

  return (
    <>
      <div
        className={!showDropdownYear ? "selectYear" : "selectYear-click"}
        onClick={showDropdownYearHandler}
        tabIndex={clicked ? -1 : 0}
        {...(clicked ? {} : { onBlur: blurHandler })}
      >
        <h2 className="selectYear__header">{selectedYear}</h2>
        <FontAwesomeIcon
          className={
            !showDropdownYear && initialYear
              ? "selectYear__arrow"
              : showDropdownYear && !initialYear
              ? "selectYear__arrow show"
              : "selectYear__arrow hide"
          }
          icon={showDropdownYear ? faCaretUp : faCaretDown}
          size="lg"
          style={{ color: "#000000" }}
        />
      </div>
      <ul
        className={
          !showDropdownYear
            ? "selectYear__dropdown__hide"
            : "selectYear__dropdown__show"
        }
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
