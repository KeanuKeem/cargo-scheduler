const Shipment = require("../models/Shipment");

const makeSchedule = (schedule, month, year) => {
  let finalSchedule = [
    {
      month,
      year,
      shipments: [],
    },
  ];
  for (const shipment of schedule) {
    const filteredSchedule = finalSchedule[0].shipments.filter((dateObj) => {
      return dateObj.date === shipment.day.date;
    });
    if (filteredSchedule.length > 0) {
      if (shipment.contType === "LCLFAK") {
        continue;
      } else {
        filteredSchedule[0].values.push({
          id: shipment.ref,
          contType: shipment.contType,
          cargoType: shipment.cargoType,
        });
      }
    } else {
      if (shipment.contType === "LCLFAK") {
        continue;
      } else {
        finalSchedule[0].shipments.push({
          date: shipment.day.date,
          values: [
            {
              id: shipment.ref,
              contType: shipment.contType,
              cargoType: shipment.cargoType,
            },
          ],
        });
      }
    }
  }
  return finalSchedule;
};

const findShipmentsByDay = async (month, year, type, username) => {
  let schedule;
  if (type === "All") {
    schedule = await Shipment.find({
      "day.month": month,
      "day.year": year,
      creator: username,
    });
  } else {
    schedule = await Shipment.find({
      "day.month": month,
      "day.year": year,
      cargoType: type,
      creator: username,
    });
  }

  return makeSchedule(schedule, month, year);
};

exports.findShipmentsByDay = findShipmentsByDay;
