const Shipment = require("../models/Shipment");

const makeShipment = async (req) => {
  const existingShipment = Shipment.findOne({
    ref: req.body.ref,
    creator: req.userData.userId,
  });
  if (existingShipment !== null) {
    return "This shipment Ref# already exists!";
  } else {
    const shipment = new Shipment({
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
        creator: req.userData.userId,
      });
      await shipment
        .save()
        .then(() => {
          return "successful";
        })
        .catch(() => {
          return "Data could not be saved. Please try again!";
        });
  }
  
};

exports.makeShipment = makeShipment;
