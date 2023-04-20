const Shipment = require("../models/Shipment");
const monthChanger = require("../references/schedule-references");

const createShipment = (req, res) => {
  const newShipment = new Shipment({
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
  });

  newShipment
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const getShipment = async (req, res) => {
  const ref = req.query.id;

  try {
    const shipment = await Shipment.findOne({ ref: ref });
    res.status(200).send(shipment);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const saveShipment = (req, res) => {
  const ref = req.body.ref;

  const shipment = Shipment.findOneAndUpdate(
    { ref: ref },
    {
      mbl: {
        number: req.body.mblNumber,
        isSurr: req.body.isMblSurr,
        date: req.body.mblSurrDate,
      },
      hbl: {
        number: req.body.hblNumber,
        isSurr: req.body.isHblSurr,
        date: req.body.hblSurrDate,
      },
      stepOne: {
        isHandle: req.body.isHandleStepOne,
        isDone: req.body.isStepOneDone,
        date: req.body.stepOneValue,
      },
      stepTwo: {
        isHandle: req.body.isHandleStepTwo,
        isDone: req.body.isStepTwoDone,
        date: req.body.stepTwoValue,
      },
      stepThree: {
        isHandle: req.body.isHandleStepThree,
        isDone: req.body.isStepThreeDone,
        date: req.body.stepThreeValue,
      },
      stepFour: {
        isHandle: req.body.isHandleStepFour,
        isDone: req.body.isStepFourDone,
        date: req.body.stepFourValue,
      },
      stepFive: {
        isHandle: req.body.isHandleStepFive,
        isDone: req.body.isStepFiveDone,
        date: req.body.stepFiveValue,
      },
      stepSix: {
        isHandle: req.body.isHandleStepSix,
        isDone: req.body.isStepSixDone,
        date: req.body.stepSixValue,
      },
      stepSeven: {
        isHandle: req.body.isHandleStepSeven,
        isStart: req.body.isStepSevenStart,
        isEnd: req.body.isStepSevenEnd,
        startDate: req.body.stepSevenStartValue,
        endDate: req.body.stepSevenEndValue,
      },
    }
  )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const updateShipment = (req, res) => {
  const ref = req.body.ref;

  const shipment = Shipment.findOneAndUpdate(
    { ref: ref },
    {
      ref: req.body.ref,
      cargoType: req.body.cargoType,
      contType: req.body.contType,
      schedule: req.body.schedule,
      port: req.body.port,
      vessel: req.body.vessel.toUpperCase(),
      voyage: req.body.voyage.toUpperCase(),
      mbl: {
        number: req.body.mbl.number,
        isSurr: req.body.mbl.isSurr,
        date: req.body.mbl.date,
      },
      hbl: {
        number: req.body.hbl.number,
        isSurr: req.body.hbl.isSurr,
        date: req.body.hbl.date,
      },
      container: req.body.container.toUpperCase(),
      depot: req.body.depot,
      notes: req.body.notes,
      fakShipments: req.body.fakShipments,
      day: {
        date: Number(req.body.schedule.slice(8, 10)),
        month: monthChanger(req.body.schedule.slice(5, 7)),
        year: Number(req.body.schedule.slice(0, 4)),
      },
      stepOne: {
        isHandle: req.body.stepOne.isHandle,
        isDone: req.body.stepOne.isDone,
        date: req.body.stepOne.date,
      },
      stepTwo: {
        isHandle: req.body.stepTwo.isHandle,
        isDone: req.body.stepTwo.isDone,
        date: req.body.stepTwo.date,
      },
      stepThree: {
        isHandle: req.body.stepThree.isHandle,
        isDone: req.body.stepThree.isDone,
        date: req.body.stepThree.date,
      },
      stepFour: {
        isHandle: req.body.stepFour.isHandle,
        isDone: req.body.stepFour.isDone,
        date: req.body.stepFour.date,
      },
      stepFive: {
        isHandle: req.body.stepFive.isHandle,
        isDone: req.body.stepFive.isDone,
        date: req.body.stepFive.date,
      },
      stepSix: {
        isHandle: req.body.stepSix.isHandle,
        isDone: req.body.stepSix.isDone,
        date: req.body.stepSix.date,
      },
      stepSeven: {
        isHandle: req.body.stepSeven.isHandle,
        isStart: req.body.stepSeven.isStart,
        isEnd: req.body.stepSeven.isEnd,
        startDate: req.body.stepSeven.startDate,
        endDate: req.body.stepSeven.endDate,
      },
    }
  )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const createShipmentInFak = async (req, res) => {
  const masterID = req.query.id;

  const shipment = await Shipment.findOne({ ref: masterID });

  shipment.fakShipments.push({ ref: req.body.ref });

  await shipment
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const updateShipmentsInFak = async (req, res) => {
  const masterID = req.query.id;

  const masterShipment = await Shipment.findOne({ ref: masterID });

  masterShipment.fakShipments.forEach(async (shipmentId) => {
    Shipment.findOneAndUpdate(
      { ref: shipmentId.ref },
      {
        schedule: req.body.schedule,
        prevSchedule: req.body.prevSchedule,
        port: req.body.port,
        vessel: req.body.vessel.toUpperCase(),
        voyage: req.body.voyage.toUpperCase(),
        container: req.body.container.toUpperCase(),
        depot: req.body.depot,
        day: {
          date: Number(req.body.schedule.slice(8, 10)),
          month: monthChanger(req.body.schedule.slice(5, 7)),
          year: Number(req.body.schedule.slice(0, 4)),
        },
      }
    ).catch((err) => {
      res.status(500).send(err);
    });
  });

  await Shipment.findOneAndUpdate(
    { ref: masterID },
    {
      schedule: req.body.schedule,
      prevSchedule: req.body.prevSchedule,
      port: req.body.port,
      vessel: req.body.vessel,
      voyage: req.body.voyage,
      container: req.body.container,
      depot: req.body.depot,
      notes: req.body.notes,
      day: {
        date: Number(req.body.schedule.slice(8, 10)),
        month: monthChanger(req.body.schedule.slice(5, 7)),
        year: Number(req.body.schedule.slice(0, 4)),
      },
    }
  )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deleteShipment = async (req, res) => {
  const ref = req.query.id;

  await Shipment.deleteOne({ ref: ref })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deleteShipments = async (req, res) => {
  const ref = req.query.id;

  const shipment = await Shipment.findOne({ ref: ref });

  shipment.fakShipments.forEach(async (shipmentObj) => {
    await Shipment.deleteOne({ ref: shipmentObj.ref }).catch((err) => {
      res.status(500).send(err);
    });
  });

  shipment
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deleteShipmentInFak = async (req, res) => {
  const masterId = req.query.mId;
  const ref = req.query.id;

  const shipment = await Shipment.findOne({ ref: masterId });

  const shipmentIndex = shipment.fakShipments.findIndex((shipmentObj) => {
    return shipmentObj.ref === ref;
  });

  shipment.fakShipments.splice(shipmentIndex, shipmentIndex + 1);

  await shipment
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// const getShipmentsByVessel = async (req, res) => {
//   const vessel = req.query.vessel.toUpperCase();
//   const voyage = req.query.voyage.toUpperCase();

//   try {
//     const shipments = await Shipment.find({ vessel, voyage });
//     res.status(200).send(shipments);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// };

const updateVesselSchedules = async (req, res) => {
  try {
    const vessel = req.body[0].vessel.toUpperCase();
    const voyage = req.body[0].voyage.toUpperCase();
    const newSchedule = req.body[0].newSchedule;
    const date = Number(newSchedule.slice(8, 10));
    const month = monthChanger(newSchedule.slice(5, 7));
    const year = Number(newSchedule.slice(0, 4));
    const cargoType = req.body[0].type;

    if (cargoType === "All") {
      await Shipment.updateMany(
        { vessel, voyage },
        {
          $set: {
            schedule: newSchedule,
            day: {
              date,
              month,
              year,
            },
          },
        }
      ).then((result) => {
        res.status(200).send(result);
      });
    } else {
      await Shipment.updateMany(
        { vessel, voyage, cargoType },
        {
          $set: {
            schedule: newSchedule,
            day: {
              date,
              month,
              year,
            },
          },
        }
      ).then((result) => {
        res.status(200).send(result);
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getScheduleByDay = async (req, res) => {
  try {
    const month = req.query.month;
    const year = req.query.year;
    const type = req.query.type;
    const finalSchedule = [
      {
        month,
        year,
        shipments: [],
      },
    ];

    let schedule;
    if (type === "All") {
      schedule = await Shipment.find({ "day.month": month, "day.year": year });
    } else {
      schedule = await Shipment.find({
        "day.month": month,
        "day.year": year,
        cargoType: type,
      });
    }

    for (const shipment of schedule) {
      const filteredSchedule = finalSchedule[0].shipments.filter((dateObj) => {
        return dateObj.date === shipment.day.date;
      });
      if (filteredSchedule.length > 0) {
        if (shipment.contType === "LCLFAK") {
          continue;
        } else {
          await filteredSchedule[0].values.push({
            id: shipment.ref,
            contType: shipment.contType,
            cargoType: shipment.cargoType,
          });
        }
      } else {
        if (shipment.contType === "LCLFAK") {
          continue;
        } else {
          await finalSchedule[0].shipments.push({
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

    res.status(200).send(finalSchedule);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createShipment = createShipment;
exports.getShipment = getShipment;
exports.saveShipment = saveShipment;
exports.updateShipment = updateShipment;
exports.createShipmentInFak = createShipmentInFak;
exports.updateShipmentsInFak = updateShipmentsInFak;
exports.deleteShipment = deleteShipment;
exports.deleteShipments = deleteShipments;
exports.deleteShipmentInFak = deleteShipmentInFak;
exports.updateVesselSchedules = updateVesselSchedules;
exports.getScheduleByDay = getScheduleByDay;
