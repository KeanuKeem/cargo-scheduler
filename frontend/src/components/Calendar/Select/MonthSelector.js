// React
import React, { useContext, useState, useEffect } from "react";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

// Context
import SelectContext from "../../../store/select-context";

// CSS
import "./MonthSelector.css";

// -----MonthSelector-Component----- //
const MonthSelector = (props) => {
  const ctx = useContext(SelectContext);

  const [selectedMonth, setSelectedMonth] = useState(ctx.thisMonth);
  const [animationEnd, setAnimationEnd] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [selectMonthClass, setSelectMonthClass] = useState("selectMonth");
  const [arrowClass, setArrowClass] = useState("selectMonth__arrow");
  const [dropdownClass, setDropdownClass] = useState("selectMonth__dropdown");

  const showDropdownMonthHandler = () => {
    setSelectMonthClass("selectMonth-click");
    setArrowClass("selectMonth__arrow show");
    setDropdownClass("selectMonth__dropdown__show");
    setAnimationEnd(!animationEnd);
  };

  const selectMonthHandler = (event) => {
    setSelectedMonth(event.target.id);
    ctx.setMonth(event.target.id);
    setSelectMonthClass("selectMonth");
    setArrowClass("selectMonth__arrow hide");
    setDropdownClass("selectMonth__dropdown__hide");
    setTimeout(() => {
      setDropdownClass("selectMonth__dropdown");
    }, 400);
    setAnimationEnd(false);
  };

  const fileMonthHandler = (event) => {
    setSelectedMonth(event.target.id);
    props.setMonth(event.target.id);
    setSelectMonthClass("selectMonth");
    setArrowClass("selectMonth__arrow hide");
    setDropdownClass("selectMonth__dropdown__hide");
    setTimeout(() => {
      setDropdownClass("selectMonth__dropdown");
    }, 400);
    setAnimationEnd(false);
  };

  const blurHandler = () => {
    setSelectMonthClass("selectMonth");
    setArrowClass("selectMonth__arrow hide");
    setDropdownClass("selectMonth__dropdown__hide");
    setTimeout(() => {
      setDropdownClass("selectMonth__dropdown");
    }, 400);
    setAnimationEnd(false);
  };

  const animationStateHandler = () => {
    setAnimationEnd(true);
  };

  useEffect(() => {
    setSelectedMonth(ctx.month);
  }, [ctx.month]);

  if (props.sendFrom === "file") {
    return (
      <div className={props.className}>
        <div
          className={selectMonthClass}
          onClick={showDropdownMonthHandler}
          tabIndex={clicked ? -1 : 0}
          {...(clicked ? {} : { onBlur: blurHandler })}
          onAnimationEnd={animationStateHandler}
        >
          <h2 className="selectMonth__header">{selectedMonth}</h2>
          <FontAwesomeIcon
            className={arrowClass}
            icon={
              arrowClass === "selectMonth__arrow show" ? faCaretUp : faCaretDown
            }
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
            className={selectedMonth === "All" ? "this-month" : ""}
            onClick={fileMonthHandler}
            id="All"
          >
            All
          </li>
          <li
            className={selectedMonth === "January" ? "this-month" : ""}
            onClick={fileMonthHandler}
            id="January"
          >
            January
          </li>
          <li
            className={selectedMonth === "February" ? "this-month" : ""}
            onClick={fileMonthHandler}
            id="February"
          >
            February
          </li>
          <li
            className={selectedMonth === "March" ? "this-month" : ""}
            onClick={fileMonthHandler}
            id="March"
          >
            March
          </li>
          <li
            className={selectedMonth === "April" ? "this-month" : ""}
            onClick={fileMonthHandler}
            id="April"
          >
            April
          </li>
          <li
            className={selectedMonth === "May" ? "this-month" : ""}
            onClick={fileMonthHandler}
            id="May"
          >
            May
          </li>
          <li
            className={selectedMonth === "June" ? "this-month" : ""}
            onClick={fileMonthHandler}
            id="June"
          >
            June
          </li>
          <li
            className={selectedMonth === "July" ? "this-month" : ""}
            onClick={fileMonthHandler}
            id="July"
          >
            July
          </li>
          <li
            className={selectedMonth === "August" ? "this-month" : ""}
            onClick={fileMonthHandler}
            id="August"
          >
            August
          </li>
          <li
            className={selectedMonth === "September" ? "this-month" : ""}
            onClick={fileMonthHandler}
            id="September"
          >
            September
          </li>
          <li
            className={selectedMonth === "October" ? "this-month" : ""}
            onClick={fileMonthHandler}
            id="October"
          >
            October
          </li>
          <li
            className={selectedMonth === "November" ? "this-month" : ""}
            onClick={fileMonthHandler}
            id="November"
          >
            November
          </li>
          <li
            className={selectedMonth === "December" ? "this-month" : ""}
            onClick={fileMonthHandler}
            id="December"
          >
            December
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className={props.className}>
      <div
        className={selectMonthClass}
        onClick={showDropdownMonthHandler}
        tabIndex={clicked ? -1 : 0}
        {...(clicked ? {} : { onBlur: blurHandler })}
        onAnimationEnd={animationStateHandler}
      >
        <h2 className="selectMonth__header">{selectedMonth}</h2>
        <FontAwesomeIcon
          className={arrowClass}
          icon={
            arrowClass === "selectMonth__arrow show" ? faCaretUp : faCaretDown
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
        <li
          className={selectedMonth === "January" ? "this-month" : ""}
          onClick={selectMonthHandler}
          id="January"
        >
          January
        </li>
        <li
          className={selectedMonth === "February" ? "this-month" : ""}
          onClick={selectMonthHandler}
          id="February"
        >
          February
        </li>
        <li
          className={selectedMonth === "March" ? "this-month" : ""}
          onClick={selectMonthHandler}
          id="March"
        >
          March
        </li>
        <li
          className={selectedMonth === "April" ? "this-month" : ""}
          onClick={selectMonthHandler}
          id="April"
        >
          April
        </li>
        <li
          className={selectedMonth === "May" ? "this-month" : ""}
          onClick={selectMonthHandler}
          id="May"
        >
          May
        </li>
        <li
          className={selectedMonth === "June" ? "this-month" : ""}
          onClick={selectMonthHandler}
          id="June"
        >
          June
        </li>
        <li
          className={selectedMonth === "July" ? "this-month" : ""}
          onClick={selectMonthHandler}
          id="July"
        >
          July
        </li>
        <li
          className={selectedMonth === "August" ? "this-month" : ""}
          onClick={selectMonthHandler}
          id="August"
        >
          August
        </li>
        <li
          className={selectedMonth === "September" ? "this-month" : ""}
          onClick={selectMonthHandler}
          id="September"
        >
          September
        </li>
        <li
          className={selectedMonth === "October" ? "this-month" : ""}
          onClick={selectMonthHandler}
          id="October"
        >
          October
        </li>
        <li
          className={selectedMonth === "November" ? "this-month" : ""}
          onClick={selectMonthHandler}
          id="November"
        >
          November
        </li>
        <li
          className={selectedMonth === "December" ? "this-month" : ""}
          onClick={selectMonthHandler}
          id="December"
        >
          December
        </li>
      </ul>
    </div>
  );
};

export default MonthSelector;
