// React
import React, { Fragment, useContext } from "react";

// Context
import SelectContext from "../../../store/select-context";

// -----MonthSelector-Component----- //
const MonthSelector = (props) => {
  const ctx = useContext(SelectContext);

  return (
    <Fragment>
      <select
        name="month"
        value={ctx.month}
        onChange={ctx.onMonthChange}
        className={props.className}
      >
        <option value="January">January</option>
        <option value="February">Feburary</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
    </Fragment>
  );
};

export default MonthSelector;
