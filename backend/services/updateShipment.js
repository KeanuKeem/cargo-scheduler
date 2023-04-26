const Shipment = require("../models/Shipment");
const monthChanger = require("../services/schedule-references");

const updateShipmentHandler = async (req) => {
  if (req.body.contType === "FAK") {
    try {
      const masterShipment = await Shipment.findOne({
        ref: req.body.ref,
        creator: req.userData.userId,
      });
      masterShipment.fakShipments.forEach(async (shipmentId) => {
        const shipmentInFak = await Shipment.findOneAndUpdate(
          {
            ref: shipmentId.ref,
            creator: req.userData.userId,
          },
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
        );
        await shipmentInFak.save();
      });

      const masterFak = await Shipment.findOneAndUpdate(
        {
          ref: req.body.ref,
          creator: req.userData.userId,
        },
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
      );
      masterFak.save();

      return { result: true };
    } catch {
      return {
        result: false,
        message: "Could not update the data, please try again!",
      };
    }
  } else {
    try {
      const updatedShipment = await Shipment.findOneAndUpdate(
        {
          ref: req.body.ref,
          creator: req.userData.userId,
        },
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
          creator: req.userData.UserId,
        }
      );
      await updatedShipment.save();

      return { result: true };
    } catch {
      return {
        result: false,
        message: "Could not update the data, please try again!",
      };
    }
  }
};

exports.updateShipmentHandler = updateShipmentHandler;
