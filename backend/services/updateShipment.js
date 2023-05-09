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
          "mbl.number": req.body.mbl.number,
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
  } else if (req.body.contType === "AIR") {
    try {
      const updatedShipment = await Shipment.findOneAndUpdate(
        { ref: req.body.ref, creator: req.userData.userId },
        {
          cargoType: req.body.cargoType,
          schedule: req.body.schedule,
          port: req.body.port,
          vessel: req.body.vessel,
          day: {
            date: Number(req.body.schedule.slice(8, 10)),
            month: monthChanger(req.body.schedule.slice(5, 7)),
            year: Number(req.body.schedule.slice(0, 4)),
          },
          "mbl.number": req.body.mbl.number,
          "hbl.number": req.body.hbl.number,
          depot: req.body.depot,
          notes: req.body.notes,
          "stepOne.isHandle": req.body.stepOne.isHandle,
          "stepTwo.isHandle": req.body.stepTwo.isHandle,
          "stepThree.isHandle": req.body.stepThree.isHandle,
          "stepFour.isHandle": req.body.stepFour.isHandle,
          "stepFive.isHandle": req.body.stepFive.isHandle,
          "stepSix.isHandle": req.body.stepSix.isHandle,
          "stepSeven.isHandle": req.body.stepSeven.isHandle,
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
  } else if (req.body.contType === "BKR") {
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
          "hbl.number": req.body.hbl.number,
          container: req.body.container.toUpperCase(),
          depot: req.body.depot,
          notes: req.body.notes,
          day: {
            date: Number(req.body.schedule.slice(8, 10)),
            month: monthChanger(req.body.schedule.slice(5, 7)),
            year: Number(req.body.schedule.slice(0, 4)),
          },
          "stepOne.isHandle": req.body.stepOne.isHandle,
          "stepTwo.isHandle": req.body.stepTwo.isHandle,
          "stepThree.isHandle": req.body.stepThree.isHandle,
          "stepFour.isHandle": req.body.stepFour.isHandle,
          "stepFive.isHandle": req.body.stepFive.isHandle,
          "stepSix.isHandle": req.body.stepSix.isHandle,
          "stepSeven.isHandle": req.body.stepSeven.isHandle,
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
          "mbl.number": req.body.mbl.number,
          "hbl.number": req.body.hbl.number,
          container: req.body.container.toUpperCase(),
          depot: req.body.depot,
          notes: req.body.notes,
          day: {
            date: Number(req.body.schedule.slice(8, 10)),
            month: monthChanger(req.body.schedule.slice(5, 7)),
            year: Number(req.body.schedule.slice(0, 4)),
          },
          "stepOne.isHandle": req.body.stepOne.isHandle,
          "stepTwo.isHandle": req.body.stepTwo.isHandle,
          "stepThree.isHandle": req.body.stepThree.isHandle,
          "stepFour.isHandle": req.body.stepFour.isHandle,
          "stepFive.isHandle": req.body.stepFive.isHandle,
          "stepSix.isHandle": req.body.stepSix.isHandle,
          "stepSeven.isHandle": req.body.stepSeven.isHandle,
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
