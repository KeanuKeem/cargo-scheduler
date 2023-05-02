const Shipment = require("../models/Shipment");
const User = require("../models/User");

const getIsHandleArray = (shipment) => {
  let array = [];
  if (shipment.stepOne.isHandle) {
    array.push("stepOne");
  }
  if (shipment.stepTwo.isHandle) {
    array.push("stepTwo");
  }
  if (shipment.stepThree.isHandle) {
    array.push("stepThree");
  }
  if (shipment.stepFour.isHandle) {
    array.push("stepFour");
  }
  if (shipment.stepFive.isHandle) {
    array.push("stepFive");
  }
  if (shipment.stepSix.isHandle) {
    array.push("stepSix");
  }
  if (shipment.stepSeven.isHandle) {
    array.push("stepSevenStart");
    array.push("stepSevenEnd");
  }
  array.push("");
  return array;
};

const findIsHandleIndex = (shipment) => {
  const array = getIsHandleArray(shipment);
  let index = 0;
  let foundIndex = false;
  array.some((step) => {
    if (step === "stepOne") {
      if (shipment.stepOne.isDone) {
        index++;
      } else {
        foundIndex = true;
        return true;
      }
    }
    if (step === "stepTwo") {
      if (shipment.stepTwo.isDone) {
        index++;
      } else {
        foundIndex = true;
        return true;
      }
    }
    if (step === "stepThree") {
      if (shipment.stepThree.isDone) {
        index++;
      } else {
        foundIndex = true;
        return true;
      }
    }
    if (step === "stepFour") {
      if (shipment.stepFour.isDone) {
        index++;
      } else {
        foundIndex = true;
        return true;
      }
    }
    if (step === "stepFive") {
      if (shipment.stepFive.isDone) {
        index++;
      } else {
        foundIndex = true;
        return true;
      }
    }
    if (step === "stepSix") {
      if (shipment.stepSix.isDone) {
        index++;
      } else {
        foundIndex = true;
        return true;
      }
    }
    if (step === "stepSevenStart") {
      if (shipment.stepSeven.isStart) {
        index++;
      } else {
        foundIndex = true;
        return true;
      }
    }
    if (step === "stepSevenEnd") {
      if (shipment.stepSeven.isEnd) {
        index++;
      } else {
        foundIndex = true;
        return true;
      }
    }
    if (step === "") {
      foundIndex = true;
      return true;
    }
  });
  if (foundIndex) {
    return index;
  } 

};

const findColours = async (shipment, userId) => {
  const array = getIsHandleArray(shipment);
  const index = findIsHandleIndex(shipment) - 1;

  const user = await User.findOne({ _id: userId });
  if (index < 0 || shipment.contType === "FAK") {
    return {
      font: user.preferences.fontBase,
      back: user.preferences.backBase,
    };
  } else if (index === array.length-2) {
    return {
      font: user.preferences.fontComplete,
      back: user.preferences.backComplete,
    };
  } else {
    const step = array[index];
    if (step === "stepOne") {
      return {
        font: user.preferences.fontOne,
        back: user.preferences.backOne,
      };
    } else if (step === "stepTwo") {
      return {
        font: user.preferences.fontTwo,
        back: user.preferences.backTwo,
      };
    } else if (step === "stepThree") {
      return {
        font: user.preferences.fontThree,
        back: user.preferences.backThree,
      };
    } else if (step === "stepFour") {
      return {
        font: user.preferences.fontFour,
        back: user.preferences.backFour,
      };
    } else if (step === "stepFive") {
      return {
        font: user.preferences.fontFive,
        back: user.preferences.backFive,
      };
    } else if (step === "stepSix") {
      return {
        font: user.preferences.fontSix,
        back: user.preferences.backSix,
      };
    } else if (step === "stepSevenStart") {
      return {
        font: user.preferences.fontSevenStart,
        back: user.preferences.backSevenStart,
      };
    } else {
      return {
        font: user.preferences.fontSevenEnd,
        back: user.preferences.backSevenEnd,
      };
    }
  }
};

const makeSchedule = async (schedule, month, year, userId) => {
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
          }
        });
        await masterShipment.save();
      } else {
        filteredSchedule[0].values.push({
          id: shipment.ref,
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
          }
        });
        await masterShipment.save();
      } else {
        finalSchedule[0].shipments.push({
          date: shipment.day.date,
          values: [
            {
              id: shipment.ref,
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

const findShipmentsByDay = async (month, year, type, userId) => {
  let schedule;
  if (type === "All") {
    schedule = await Shipment.find({
      "day.month": month,
      "day.year": year,
      creator: userId,
    });
  } else {
    schedule = await Shipment.find({
      "day.month": month,
      "day.year": year,
      cargoType: type,
      creator: userId,
    });
  }

  return makeSchedule(schedule, month, year, userId);
};

exports.findShipmentsByDay = findShipmentsByDay;
