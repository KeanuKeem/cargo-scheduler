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
  const [initialMonth, setInitialMonth] = useState(true);
  const [showDropdownMonth, setShowDropdownMonth] = useState(false);
  const [animationEnd, setAnimationEnd] = useState(false);
  const [clicked, setClicked] = useState(false);

  const showDropdownMonthHandler = () => {
    setShowDropdownMonth(!showDropdownMonth);
    setInitialMonth(false);
    setAnimationEnd(!animationEnd);
  };

  const selectMonthHandler = (event) => {
    setSelectedMonth(event.target.id);
    ctx.setMonth(event.target.id);
    setShowDropdownMonth(!showDropdownMonth);
    setAnimationEnd(false);
  };

  const blurHandler = () => {
    setInitialMonth(false);
    setShowDropdownMonth(false);
    setAnimationEnd(false);
  };

  const animationStateHandler = () => {
    setAnimationEnd(true);
  };

  useEffect(() => {
    setSelectedMonth(ctx.month);
  }, [ctx.month]);

  return (
    <div className={props.className}>
      <div
        className={!showDropdownMonth ? "selectMonth" : "selectMonth-click"}
        onClick={showDropdownMonthHandler}
        tabIndex={clicked ? -1 : 0}
        {...(clicked ? {} : { onBlur: blurHandler })}
        onAnimationEnd={animationStateHandler}
      >
        <h2 className="selectMonth__header">{selectedMonth}</h2>
        <FontAwesomeIcon
          className={
            !showDropdownMonth && initialMonth
              ? "selectMonth__arrow"
              : showDropdownMonth && !initialMonth
              ? "selectMonth__arrow show"
              : "selectMonth__arrow hide"
          }
          icon={showDropdownMonth ? faCaretUp : faCaretDown}
          size="lg"
          style={{ color: "#000000" }}
        />
      </div>
      <ul
        className={
          !showDropdownMonth && initialMonth
            ? "selectMonth__dropdown"
            : !showDropdownMonth && !initialMonth
            ? "selectMonth__dropdown__hide"
            : "selectMonth__dropdown__show"
        }
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
