const Shipment = require("../models/Shipment");
const User = require("../models/User");
const { monthChanger } = require("../services/schedule-references");

const checkEmptyForCreateShipment = (req) => {
  if (req.body.cargoType === "") {
    return { value: false, message: "Please select Cargo Type." };
  }
  if (req.body.contType === "") {
    return { value: false, message: "Please select Container Type." };
  }
  if (req.body.schedule === "") {
    return { value: false, message: "Please choose the date." };
  }
  // if (req.body.port === "") {
  //   return {
  //     value: false,
  //     message: "Arriving or Departuring place cannot be Empty.",
  //   };
  // }
  // if (req.body.vessel === "") {
  //   return { value: false, message: "Vessel name cannot be Empty." };
  // }
  // if (req.body.voyage === "") {
  //   return { value: false, message: "Voyage# cannot be Empty." };
  // }
  // if (req.body.container === "") {
  //   return { value: false, message: "Container# cannot be Empty." };
  // }
  // if (req.body.depot === "") {
  //   return { value: false, message: "Handling Depot cannot be Empty." };
  // }
  if (req.body.creator === "") {
    return { value: false, message: "Please log in and try again!" };
  } else {
    return { value: true };
  }
};

const makeShipment = async (req) => {
  if (req.body.ref === "") {
    return "Ref# cannot be Empty.";
  }
  const existingShipment = await Shipment.findOne({
    ref: req.body.ref,
    creator: req.userData.userId,
  });
  const checkEmpty = checkEmptyForCreateShipment(req);

  if (existingShipment !== null) {
    return "This shipment Ref# already exists!";
  }
  if (!checkEmpty.value) {
    return checkEmpty.message;
  } else {
    const user = await User.findOne({ _id: req.userData.userId });
    try {
      let shipment;
      if (req.body.contType === "FAK") {
        shipment = new Shipment({
          ref: req.body.ref,
          cargoType: req.body.cargoType,
          contType: req.body.contType,
          schedule: req.body.schedule,
          port: req.body.port,
          vessel: req.body.vessel.toUpperCase(),
          voyage: req.body.voyage.toUpperCase(),
          container: req.body.container.toUpperCase(),
          depot: req.body.depot,
          notes: req.body.notes,
          fakShipments: [],
          day: {
            date: Number(req.body.schedule.slice(8, 10)),
            month: monthChanger(req.body.schedule.slice(5, 7)),
            year: Number(req.body.schedule.slice(0, 4)),
          },
          mbl: {
            number: req.body.mblNumber,
            isSurr: false,
            date: "",
          },
          fontColour: user.preferences.fontBase,
          backColour: user.preferences.backBase,
          creator: req.userData.userId,
        });
      } else if (req.body.contType === "AIR") {
        shipment = new Shipment({
          ref: req.body.ref,
          cargoType: req.body.cargoType,
          contType: req.body.contType,
          schedule: req.body.schedule,
          port: req.body.port,
          vessel: req.body.vessel.toUpperCase(),
          depot: req.body.depot,
          notes: req.body.notes,
          day: {
            date: Number(req.body.schedule.slice(8, 10)),
            month: monthChanger(req.body.schedule.slice(5, 7)),
            year: Number(req.body.schedule.slice(0, 4)),
          },
          mbl: {
            number: req.body.mblNumber,
            isSurr: false,
            date: "",
          },
          hbl: {
            number: req.body.hblNumber,
            isSurr: false,
            date: "",
          },
          stepOne: {
            isHandle: req.body.stepOne,
            isDone: false,
            date: "",
          },
          stepTwo: {
            isHandle: req.body.stepTwo,
            isDone: false,
            date: "",
          },
          stepThree: {
            isHandle: req.body.stepThree,
            isDone: false,
            date: "",
          },
          stepFour: {
            isHandle: req.body.stepFour,
            isDone: false,
            date: "",
          },
          stepFive: {
            isHandle: req.body.stepFive,
            isDone: false,
            date: "",
          },
          stepSix: {
            isHandle: req.body.stepSix,
            isDone: false,
            date: "",
          },
          stepSeven: {
            isHandle: req.body.stepSeven,
            isStart: false,
            isEnd: false,
            startDate: "",
            endDate: "",
          },
          fontColour: user.preferences.backBase,
          backColour: user.preferences.fontBase,
          creator: req.userData.userId,
        });
      } else if (req.body.contType === "BKR") {
        shipment = new Shipment({
          ref: req.body.ref,
          cargoType: req.body.cargoType,
          contType: req.body.contType,
          schedule: req.body.schedule,
          port: req.body.port,
          vessel: req.body.vessel.toUpperCase(),
          voyage: req.body.voyage.toUpperCase(),
          container: req.body.container.toUpperCase(),
          depot: req.body.depot,
          notes: req.body.notes,
          day: {
            date: Number(req.body.schedule.slice(8, 10)),
            month: monthChanger(req.body.schedule.slice(5, 7)),
            year: Number(req.body.schedule.slice(0, 4)),
          },
          hbl: {
            number: req.body.hblNumber,
            isSurr: false,
            date: "",
          },
          stepOne: {
            isHandle: req.body.stepOne,
            isDone: false,
            date: "",
          },
          stepTwo: {
            isHandle: req.body.stepTwo,
            isDone: false,
            date: "",
          },
          stepThree: {
            isHandle: req.body.stepThree,
            isDone: false,
            date: "",
          },
          stepFour: {
            isHandle: req.body.stepFour,
            isDone: false,
            date: "",
          },
          stepFive: {
            isHandle: req.body.stepFive,
            isDone: false,
            date: "",
          },
          stepSix: {
            isHandle: req.body.stepSix,
            isDone: false,
            date: "",
          },
          stepSeven: {
            isHandle: req.body.stepSeven,
            isStart: false,
            isEnd: false,
            startDate: "",
            endDate: "",
          },
          fontColour: user.preferences.fontBase,
          backColour: user.preferences.backBase,
          creator: req.userData.userId,
        });
      } else if (req.body.contType === "LCLFAK") {
        shipment = new Shipment({
          ref: req.body.ref,
          cargoType: req.body.cargoType,
          contType: req.body.contType,
          schedule: req.body.schedule,
          port: req.body.port,
          vessel: req.body.vessel.toUpperCase(),
          voyage: req.body.voyage.toUpperCase(),
          container: req.body.container.toUpperCase(),
          depot: req.body.depot,
          notes: req.body.notes,
          consoleId: req.body.consoleId,
          day: {
            date: Number(req.body.schedule.slice(8, 10)),
            month: monthChanger(req.body.schedule.slice(5, 7)),
            year: Number(req.body.schedule.slice(0, 4)),
          },
          mbl: {
            number: req.body.mblNumber,
            isSurr: false,
            date: "",
          },
          hbl: {
            number: req.body.hblNumber,
            isSurr: false,
            date: "",
          },
          stepOne: {
            isHandle: req.body.stepOne,
            isDone: false,
            date: "",
          },
          stepTwo: {
            isHandle: req.body.stepTwo,
            isDone: false,
            date: "",
          },
          stepThree: {
            isHandle: req.body.stepThree,
            isDone: false,
            date: "",
          },
          stepFour: {
            isHandle: req.body.stepFour,
            isDone: false,
            date: "",
          },
          stepFive: {
            isHandle: req.body.stepFive,
            isDone: false,
            date: "",
          },
          stepSix: {
            isHandle: req.body.stepSix,
            isDone: false,
            date: "",
          },
          stepSeven: {
            isHandle: req.body.stepSeven,
            isStart: false,
            isEnd: false,
            startDate: "",
            endDate: "",
          },
          fontColour: user.preferences.fontBase,
          backColour: user.preferences.backBase,
          creator: req.userData.userId,
        });
      } else {
        shipment = new Shipment({
          ref: req.body.ref,
          cargoType: req.body.cargoType,
          contType: req.body.contType,
          schedule: req.body.schedule,
          port: req.body.port,
          vessel: req.body.vessel.toUpperCase(),
          voyage: req.body.voyage.toUpperCase(),
          container: req.body.container.toUpperCase(),
          depot: req.body.depot,
          notes: req.body.notes,
          day: {
            date: Number(req.body.schedule.slice(8, 10)),
            month: monthChanger(req.body.schedule.slice(5, 7)),
            year: Number(req.body.schedule.slice(0, 4)),
          },
          mbl: {
            number: req.body.mblNumber,
            isSurr: false,
            date: "",
          },
          hbl: {
            number: req.body.hblNumber,
            isSurr: false,
            date: "",
          },
          stepOne: {
            isHandle: req.body.stepOne,
            isDone: false,
            date: "",
          },
          stepTwo: {
            isHandle: req.body.stepTwo,
            isDone: false,
            date: "",
          },
          stepThree: {
            isHandle: req.body.stepThree,
            isDone: false,
            date: "",
          },
          stepFour: {
            isHandle: req.body.stepFour,
            isDone: false,
            date: "",
          },
          stepFive: {
            isHandle: req.body.stepFive,
            isDone: false,
            date: "",
          },
          stepSix: {
            isHandle: req.body.stepSix,
            isDone: false,
            date: "",
          },
          stepSeven: {
            isHandle: req.body.stepSeven,
            isStart: false,
            isEnd: false,
            startDate: "",
            endDate: "",
          },
          fontColour: user.preferences.fontBase,
          backColour: user.preferences.backBase,
          creator: req.userData.userId,
        });
      }

      await shipment.save();

      if (req.body.contType === "LCLFAK") {
        const masterShipment = await Shipment.findOne({
          ref: req.body.consoleId,
          creator: req.userData.userId,
        });
        const user = await User.findOne({
          _id: req.userData.userId,
        });
        masterShipment.fakShipments.push({
          ref: req.body.ref,
          font: user.preferences.fontBase,
          back: user.preferences.backBase,
        });

        await masterShipment.save();
      }

      return "successful";
    } catch (err) {
      console.log(err);
      return "Save unsuccesful, please try again!";
    }
  }
};

exports.makeShipment = makeShipment;
