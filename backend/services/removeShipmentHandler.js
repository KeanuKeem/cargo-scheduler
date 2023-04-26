const Shipment = require("../models/Shipment");

const removeShipmentHandler = async (req) => {
    if (req.query.mId !== "") {
        try {
            let index = 0;
            const masterShipment = await Shipment.findOne({ref: req.query.mId, creator: req.userData.userId});
            for (let i = 0; i < masterShipment.fakShipments.length; i++) {
                if (masterShipment.fakShipments[i].ref === req.query.id) {
                    break;
                } else {
                    index++;
                }
            }
            masterShipment.fakShipments.splice(index, 1);

            await masterShipment.save();
            await Shipment.deleteOne({ref: req.query.id, creator: req.userData.userId});

            return {result: true};
        } catch {
            return {result: false, message: "Could not delete the shipment, please try again!"};
        }
    } else {
        try {
            await Shipment.deleteOne({ref: req.query.id, creator: req.userData.userId});
            return {result: true};
        } catch {
            return {result: false, message: "Could not delete the shipment, please try again!"};
        }
    }
};

exports.removeShipmentHandler = removeShipmentHandler;