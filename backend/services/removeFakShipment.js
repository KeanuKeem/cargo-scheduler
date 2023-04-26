const Shipment = require("../models/Shipment");

const removeFakShipment = async (req) => {
  try {
    const masterShipment = await Shipment.findOne({
      ref: req.query.id,
      creator: req.userData.userId,
    });
    masterShipment.fakShipments.forEach(async (shipmentId) => {
      await Shipment.findOneAndDelete({
        ref: shipmentId.ref,
        creator: req.userData.userId,
      });
    });

    await Shipment.findOneAndDelete({
      ref: req.query.id,
      creator: req.userData.userId,
    });

    return {result: true};
  } catch {
    return {
      result: false,
      message: "Could not delete the shipment, please try again!",
    };
  }
};

exports.removeFakShipment = removeFakShipment;
