// React
import React, { Fragment, useContext } from "react";

// Context
import SelectContext from "../../../store/select-context";

// Reference Function
import { getSelectYearArray } from "../../Reference/Calendar";

// -----YearSelector-Components----- //
const YearSelector = () => {
  const ctx = useContext(SelectContext);

  const yearArray = getSelectYearArray(ctx.thisYear);

  return (
    <Fragment>
      <select name="year" value={ctx.year} onChange={ctx.onYearChange}>
        {yearArray.map((y) => {
          return (
            <option key={y} value={y}>
              {y}
            </option>
          );
        })}
      </select>
    </Fragment>
  );
};

export default YearSelector;
