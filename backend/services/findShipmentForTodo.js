const Shipment = require("../models/Shipment");
const { findColours } = require("./findShipment");

const makeScheduleForTodo = async (schedule, month, year, userId) => {
  let finalSchedule = [
    {
      month,
      year,
      shipments: [],
    },
  ];
  for (const shipment of schedule) {
    const colours = await findColours(shipment, userId);
    const filteredSchedule = finalSchedule[0].shipments.filter((dateObj) => {
      return dateObj.date === shipment.day.date;
    });
    if (filteredSchedule.length > 0) {
      if (shipment.contType === "LCLFAK") {
        const masterShipment = await Shipment.findOne({
          ref: shipment.consoleId,
        });
        masterShipment.fakShipments.map((shipmentInFak) => {
          if (shipmentInFak.ref === shipment.ref) {
            shipmentInFak.font = colours.font;
            shipmentInFak.back = colours.back;
            shipmentInFak.isHold = shipment.isHold;
          }
        });
        await masterShipment.save();
        filteredSchedule[0].values.push({
          id: shipment.ref,
          isHold: shipment.isHold,
          contType: shipment.contType,
          cargoType: shipment.cargoType,
          font: colours.font,
          back: colours.back,
          consoleId: shipment.consoleId
        });
      } else {
        filteredSchedule[0].values.push({
          id: shipment.ref,
          isHold: shipment.isHold,
          contType: shipment.contType,
          cargoType: shipment.cargoType,
          font: colours.font,
          back: colours.back,
        });
      }
    } else {
      if (shipment.contType === "LCLFAK") {
        const masterShipment = await Shipment.findOne({
          ref: shipment.consoleId,
        });
        masterShipment.fakShipments.map((shipmentInFak) => {
          if (shipmentInFak.ref === shipment.ref) {
            shipmentInFak.font = colours.font;
            shipmentInFak.back = colours.back;
            shipmentInFak.isHold = shipment.isHold;
          }
        });
        await masterShipment.save();
        finalSchedule[0].shipments.push({
          date: shipment.day.date,
          values: [
            {
              id: shipment.ref,
              isHold: shipment.isHold,
              contType: shipment.contType,
              cargoType: shipment.cargoType,
              font: colours.font,
              back: colours.back,
              consoleId: shipment.consoleId
            },
          ],
        });
      } else {
        finalSchedule[0].shipments.push({
          date: shipment.day.date,
          values: [
            {
              id: shipment.ref,
              isHold: shipment.isHold,
              contType: shipment.contType,
              cargoType: shipment.cargoType,
              font: colours.font,
              back: colours.back,
            },
          ],
        });
      }
    }
  }
  return finalSchedule;
};

const findShipmentForTodo = async (date, month, year, type, shipType, userId) => {
  let schedule;
  if (type === "All") {
    if (shipType === "All" || shipType === "Type") {
      schedule = await Shipment.find({
        "day.date": date,
        "day.month": month,
        "day.year": year,
        creator: userId,
      });
    } else {
      schedule = await Shipment.find({
        "day.date": date,
        "day.month": month,
        "day.year": year,
        contType: shipType,
        creator: userId,
      });
    }
  } else {
    if (shipType === "All" || shipType === "Type") {
      schedule = await Shipment.find({
        "day.date": date,
        "day.month": month,
        "day.year": year,
        cargoType: type,
        creator: userId,
      });
    } else {
      schedule = await Shipment.find({
        "day.date": date,
        "day.month": month,
        "day.year": year,
        cargoType: type,
        contType: shipType,
        creator: userId,
      });
    }
  }

  return makeScheduleForTodo(schedule, month, year, userId);
};

exports.findShipmentForTodo = findShipmentForTodo;
