const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthDigits = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function dateSplit(day) {
  const year = Number(day.slice(0, 4));
  const month = months[Number(day.slice(5, 7)) - 1];
  const date = Number(day.slice(8, 10));

  return { year: year, month: month, date: date };
}

function monthChanger(month) {
  return months[Number(month) - 1];
}

function monthDigitsInNumber(month) {
  const monthIndex = Number(monthDigits.indexOf(month)) + 1;
  if (monthIndex.toString().length > 1) {
    return monthIndex.toString();
  }
  return "0" + monthIndex.toString();
}

function monthDigitsInString(month) {
  const monthIndex = monthDigits.indexOf(month);
  return months[monthIndex];
}

exports.dateSplit = dateSplit;
exports.monthChanger = monthChanger;
exports.monthDigitsInNumber = monthDigitsInNumber;
exports.monthDigitsInString = monthDigitsInString;
