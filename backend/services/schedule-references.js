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

function dateSplit(day) {
    const year = Number(day.slice(0, 4));
    const month = months[Number(day.slice(5, 7)) - 1];
    const date = Number(day.slice(8, 10));
  
    return { year: year, month: month, date: date };
}

function monthChanger(month) {
    return months[Number(month)-1];
}
  
module.exports = dateSplit;
module.exports = monthChanger;