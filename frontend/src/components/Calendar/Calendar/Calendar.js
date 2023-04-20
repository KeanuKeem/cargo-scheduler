// React
import React, { useState, useContext, useEffect } from "react";

// Context
import SelectContext from "../../../store/select-context";

// CSS
import "./Calendar.css";

const dayArray = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const prev = "<";
const next = ">";

// -----Calendar-Components----- //
const Calendar = (props) => {
  const ctx = useContext(SelectContext);
  const [isToday, setIsToday] = useState(false);

  const todayHandler = () => {
    if (ctx.month === ctx.thisMonth && ctx.year === ctx.thisYear) {
      setIsToday(true);
    } else {
      setIsToday(false);
    }
  };

  useEffect(()=> {
    todayHandler();
  }, [ctx.month, ctx.year]);
  

  return (
    <div className="calendar">
      <table className="calendar__table">
        <thead>
          <tr className="calendar__table__this-month-tr">
            <td colSpan="7" className="calendar__table__this-month">
              <button
                onClick={props.prevMonth}
                className="calendar__table__prev-btn"
              >
                {prev}
              </button>
              {ctx.month}
              <button
                onClick={props.nextMonth}
                className="calendar__table__next-btn"
              >
                {next}
              </button>
            </td>
          </tr>
          <tr>
            {dayArray.map((day) => {
              return (
                <td className="calendar__table__weekday" key={day}>
                  {day}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {props.monthArray.slice(0, 7).map((day) => {
              return (
                <td
                  className={
                    isToday &&
                    ctx.today === day.value.date
                      ? "calendar__today"
                      : "calendar__table__day"
                  }
                  key={day.key}
                >
                  <p className="calendar__table__day-date">
                    {isToday && ctx.today === day.value.date ? (
                      <span>{day.value.date}</span>
                    ) : (
                      day.value.date
                    )}
                  </p>
                  <div className="calendar__table__shipments">
                    {day.value.shipments &&
                      day.value.shipments.map((item) => {
                        return (
                          <p
                            className="calendar__table__shipments-item"
                            key={item.id}
                            onClick={props.onShipmentClicked}
                            id={`${day.value.date}+${item.id}`}
                            name={day.value.date}
                          >
                            &#40;{item.contType}&#41; {item.id}
                          </p>
                        );
                      })}
                  </div>
                </td>
              );
            })}
          </tr>
          <tr>
            {props.monthArray.slice(7, 14).map((day) => {
              return (
                <td
                  className={
                    isToday &&
                    ctx.today === day.value.date
                      ? "calendar__today"
                      : "calendar__table__day"
                  }
                  key={day.key}
                >
                  <p className="calendar__table__day-date">
                    {isToday && ctx.today === day.value.date ? (
                      <span>{day.value.date}</span>
                    ) : (
                      day.value.date
                    )}
                  </p>
                  <div className="calendar__table__shipments">
                    {day.value.shipments &&
                      day.value.shipments.map((item) => {
                        return (
                          <p
                            className="calendar__table__shipments-item"
                            key={item.id}
                            onClick={props.onShipmentClicked}
                            id={`${day.value.date}+${item.id}`}
                            name={day.value.date}
                          >
                            &#40;{item.contType}&#41; {item.id}
                          </p>
                        );
                      })}
                  </div>
                </td>
              );
            })}
          </tr>
          <tr>
            {props.monthArray.slice(14, 21).map((day) => {
              return (
                <td
                  className={
                    isToday &&
                    ctx.today === day.value.date
                      ? "calendar__today"
                      : "calendar__table__day"
                  }
                  key={day.key}
                >
                  <p className="calendar__table__day-date">
                    {isToday && ctx.today === day.value.date ? (
                      <span>{day.value.date}</span>
                    ) : (
                      day.value.date
                    )}
                  </p>
                  <div className="calendar__table__shipments">
                    {day.value.shipments &&
                      day.value.shipments.map((item) => {
                        return (
                          <p
                            className="calendar__table__shipments-item"
                            key={item.id}
                            onClick={props.onShipmentClicked}
                            id={`${day.value.date}+${item.id}`}
                            name={day.value.date}
                          >
                            &#40;{item.contType}&#41; {item.id}
                          </p>
                        );
                      })}
                  </div>
                </td>
              );
            })}
          </tr>
          <tr>
            {props.monthArray.slice(21, 28).map((day) => {
              return (
                <td
                  className={
                    isToday &&
                    ctx.today === day.value.date
                      ? "calendar__today"
                      : "calendar__table__day"
                  }
                  key={day.key}
                >
                  <p className="calendar__table__day-date">
                    {isToday && ctx.today === day.value.date ? (
                      <span>{day.value.date}</span>
                    ) : (
                      day.value.date
                    )}
                  </p>
                  <div className="calendar__table__shipments">
                    {day.value.shipments &&
                      day.value.shipments.map((item) => {
                        return (
                          <p
                            className="calendar__table__shipments-item"
                            key={item.id}
                            onClick={props.onShipmentClicked}
                            id={`${day.value.date}+${item.id}`}
                            name={day.value.date}
                          >
                            &#40;{item.contType}&#41; {item.id}
                          </p>
                        );
                      })}
                  </div>
                </td>
              );
            })}
          </tr>
          <tr>
            {props.monthArray.slice(28, 35).map((day) => {
              return (
                <td
                  className={
                    isToday &&
                    ctx.today === day.value.date
                      ? "calendar__today"
                      : "calendar__table__day"
                  }
                  key={day.key}
                >
                  <p className="calendar__table__day-date">
                    {isToday && ctx.today === day.value.date ? (
                      <span>{day.value.date}</span>
                    ) : (
                      day.value.date
                    )}
                  </p>
                  <div className="calendar__table__shipments">
                    {day.value.shipments &&
                      day.value.shipments.map((item) => {
                        return (
                          <p
                            className="calendar__table__shipments-item"
                            key={item.id}
                            onClick={props.onShipmentClicked}
                            id={`${day.value.date}+${item.id}`}
                            name={day.value.date}
                          >
                            &#40;{item.contType}&#41; {item.id}
                          </p>
                        );
                      })}
                  </div>
                </td>
              );
            })}
          </tr>
          {props.monthArray.length > 35 && (
            <tr>
              {props.monthArray.slice(35, 42).map((day) => {
                return (
                  <td
                    className={
                      isToday &&
                      ctx.today === day.value.date
                        ? "calendar__today"
                        : "calendar__table__day"
                    }
                    key={day.key}
                  >
                    <p className="calendar__table__day-date">
                      {isToday && ctx.today === day.value.date ? (
                        <span>{day.value.date}</span>
                      ) : (
                        day.value.date
                      )}
                    </p>
                    <div className="calendar__table__shipments">
                      {day.value.shipments &&
                        day.value.shipments.map((item) => {
                          return (
                            <p
                              className="calendar__table__shipments-item"
                              key={item.id}
                              onClick={props.onShipmentClicked}
                              id={`${day.value.date}+${item.id}`}
                              name={day.value.date}
                            >
                              &#40;{item.contType}&#41; {item.id}
                            </p>
                          );
                        })}
                    </div>
                  </td>
                );
              })}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
