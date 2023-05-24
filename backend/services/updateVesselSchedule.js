const Shipment = require("../models/Shipment");
const { monthChanger } = require("./schedule-references");

const updateVesselSchedulesHandler = async (req) => {
  try {
    const date = Number(req.body.newSchedule.slice(8, 10));
    const month = monthChanger(req.body.newSchedule.slice(5, 7));
    const year = Number(req.body.newSchedule.slice(0, 4));
    if (req.body.type === "All") {
      await Shipment.updateMany(
        {
          vessel: req.body.vessel.toUpperCase(),
          voyage: req.body.voyage.toUpperCase(),
          creator: req.userData.userId,
        },
        {
          $set: {
            schedule: req.body.newSchedule,
            day: {
              date,
              month,
              year,
            },
          },
        }
      );
      return { result: true, message: "Updated Successfully!" };
    } else {
      await Shipment.updateMany(
        {
          cargoType: req.body.type,
          vessel: req.body.vessel.toUpperCase(),
          voyage: req.body.voyage.toUpperCase(),
          creator: req.userData.userId,
        },
        {
          $set: {
            schedule: req.body.newSchedule,
            day: {
              date,
              month,
              year,
            },
          },
        }
      );
      return { result: true, message: "Updated Succesfully!" };
    }
  } catch {
    return {
      result: false,
      message: "Please check schedule and try again!",
    };
  }
};

exports.updateVesselSchedulesHandler = updateVesselSchedulesHandler;
