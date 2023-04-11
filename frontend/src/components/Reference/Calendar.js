// variables, arrays
import { months, datesInMonth } from "./Calendar-variables";

// return today as DD/MM/YYYY format
export function getToday() {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  today = day + "/" + month + "/" + year;
  return today;
}

// return Month (STR) by the index (INT)
export function getMonth(monthIndex) {
  return months[monthIndex];
}

// return previous month to current month
export function getPrevMonth(month) {
  const monthIndex = months.findIndex((m) => m === month);
  if (monthIndex === 0) {
    return months[11];
  }
  return months[monthIndex - 1];
}

// return next month to current month
export function getNextMonth(month) {
  const monthIndex = months.findIndex((m) => m === month);
  if (monthIndex === 11) {
    return months[0];
  }
  return months[monthIndex + 1];
}

// return array from year 2023 ~ this year + 5
// eg) if this year is 2023, return = [2023, 2024, 2025, 2026, 2027]
export function getSelectYearArray(year) {
  let yearArray = [];
  const endYear = year + 5;

  for (let startYear = 2023; startYear <= endYear; startYear++) {
    yearArray.push(startYear);
  }

  return yearArray;
}

// add the day index number of times :: Sunday = 0, Saturday = 6
// eg) addDay(2, 0) => return 2
function addDay(loopTimes, day) {
  let loop = 0;
  while (loop < loopTimes) {
    if (day === 6) {
      day = 0;
    }
    day++;
    loop++;
  }
  return day;
}

// check for LeapYear
function isLeapYear(year) {
  if (year % 4 === 0) {
    return true;
  } else if (year % 100 === 0) {
    if (year % 400) {
      return true;
    }
    return false;
  } else {
    return false;
  }
}

// find the first day of the given Year
// eg) getStartDayOfYear(2023) will give Sunday which is 0.
function getStartDayOfYear(year) {
  let startDay = 0;
  if (year === 2023) {
    return startDay;
  }
  for (let currYear = 2023; currYear < year; currYear++) {
    if (isLeapYear(currYear)) {
      startDay = addDay(2, startDay);
    } else {
      startDay = addDay(1, startDay);
    }
  }
  return startDay;
}

// find the first day of the given month of the year
// eg) getStartDayOfMonth("February", 2023) will give Wednesday which is 3.
function getStartDayOfMonth(month, year) {
  let startDay = getStartDayOfYear(year);

  switch (month) {
    case "February":
      startDay = addDay(3, startDay);
      break;
    case "March":
      if (isLeapYear(year)) {
        startDay = addDay(4, startDay);
        break;
      }
      startDay = addDay(3, startDay);
      break;
    case "April":
      if (isLeapYear(year)) {
        break;
      }
      startDay = addDay(6, startDay);
      break;
    case "May":
      if (isLeapYear(year)) {
        startDay = addDay(2, startDay);
        break;
      }
      startDay = addDay(1, startDay);
      break;
    case "June":
      if (isLeapYear(year)) {
        startDay = addDay(5, startDay);
        break;
      }
      startDay = addDay(4, startDay);
      break;
    case "July":
      if (isLeapYear(year)) {
        break;
      }
      startDay = addDay(6, startDay);
      break;
    case "August":
      if (isLeapYear(year)) {
        startDay = addDay(3, startDay);
        break;
      }
      startDay = addDay(2, startDay);
      break;
    case "September":
      if (isLeapYear(year)) {
        startDay = addDay(6, startDay);
        break;
      }
      startDay = addDay(5, startDay);
      break;
    case "October":
      if (isLeapYear(year)) {
        startDay = addDay(1, startDay);
        break;
      }
      break;
    case "November":
      if (isLeapYear(year)) {
        startDay = addDay(4, startDay);
        break;
      }
      startDay = addDay(3, startDay);
      break;
    case "December":
      if (isLeapYear(year)) {
        startDay = addDay(6, startDay);
        break;
      }
      startDay = addDay(5, startDay);
      break;
    default:
      break;
  }

  return startDay;
}

// generate an array to create calendar
// eg) generateDateArray("March", 2023) will give as follow:
// if empty : [{key: "mt0", value: { date: ""}}]
// for date : [{key: "mt0", value: { date: ""}},
// ---------   {key: 1, value: { date: 1, shipments: []}}
// ---------  ];
export function generateDateArray(data, month, year) {
  let monthArray = [];
  let monthIndex = months.findIndex((element) => element === month);
  let mtKey = 0;
  for (let index = 0; index < getStartDayOfMonth(month, year); index++) {
    monthArray.push({
      key: "mt" + mtKey.toString(),
      value: { date: "" },
    });
    mtKey++;
  }

  if (monthIndex === 1 && isLeapYear(year)) {
    for (let date = 1; date <= datesInMonth[monthIndex].leap; date++) {
      if (data.length > 0) {
        const shipmentList = data[0].shipments.filter((d) => {
          return d.date === date;
        });
        if (shipmentList.length > 0) {
          monthArray.push({
            key: date,
            value: { date: date, shipments: shipmentList[0].values },
          });
        } else {
          monthArray.push({
            key: date,
            value: { date: date, shipments: [] },
          });
        }
      } else {
        monthArray.push({
          key: date,
          value: { date: date, shipments: [] },
        });
      }
    }
  } else if (monthIndex === 1 && !isLeapYear(year)) {
    for (let date = 1; date <= datesInMonth[monthIndex].none; date++) {
      if (data.length > 0) {
        const shipmentList = data[0].shipments.filter((d) => {
          return d.date === date;
        });
        if (shipmentList.length > 0) {
          monthArray.push({
            key: date,
            value: { date: date, shipments: shipmentList[0].values },
          });
        } else {
          monthArray.push({
            key: date,
            value: { date: date, shipments: [] },
          });
        }
      } else {
        monthArray.push({
          key: date,
          value: { date: date, shipments: [] },
        });
      }
    }
  } else {
    for (let date = 1; date <= datesInMonth[monthIndex]; date++) {
      if (data.length > 0) {
        const shipmentList = data[0].shipments.filter((d) => {
          return d.date === date;
        });
        if (shipmentList.length > 0) {
          monthArray.push({
            key: date,
            value: { date: date, shipments: shipmentList[0].values },
          });
        } else {
          monthArray.push({
            key: date,
            value: { date: date, shipments: [] },
          });
        }
      } else {
        monthArray.push({
          key: date,
          value: { date: date, shipments: [] },
        });
      }
    }
  }

  if (monthArray.length > 35) {
    const endString = 42 - monthArray.length;
    for (let endIndex = 0; endIndex < endString; endIndex++) {
      monthArray.push({
        key: "mt" + mtKey.toString(),
        value: { date: "" },
      });
      mtKey++;
    }
  } else {
    const endString = 35 - monthArray.length;
    for (let endIndex = 0; endIndex < endString; endIndex++) {
      monthArray.push({
        key: "mt" + mtKey.toString(),
        value: { date: "" },
      });
      mtKey++;
    }
  }
  
  return monthArray;
}
