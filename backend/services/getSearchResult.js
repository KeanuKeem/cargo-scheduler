const Shipment = require("../models/Shipment");

let tries;
const trySearches = async (req) => {
    try {
        tries = await Shipment.find({
            ref: {$regex: new RegExp(req.query.id, "i")},
            creator: req.userData.userId
        });
        if (tries.length > 0) {
            return {result: true, data: tries};
        }
        return {result: false, message: "There is no related shipment!"};
    } catch {
        return {result: false, message: "Server Error, please try again!"};
    }
};

const getSearchResult = async (req) => {
    try {
        const result = await trySearches(req);
        return result;
    } catch {
        return {result: false, message: "Server Error, please try again!"};
    }
  
  
};

exports.getSearchResult = getSearchResult;
