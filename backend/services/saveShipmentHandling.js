const Shipment = require("../models/Shipment");
const User = require("../models/User");
const { findColours } = require("../services/findShipment");

const saveHandling = async (req) => {
  if (req.contType === "FAK") {
    try {
      const shipment = await Shipment.findOne({ref: req.body.ref});
      const colours = findColours(shipment, req.userData.userId);
      await Shipment.findOneAndUpdate(
        {
          ref: req.body.ref,
          creator: req.userData.userId,
        },
        {
          "mbl.isSurr": req.body.isMblSurr,
          "mbl.date": req.body.mblSurrDate,
          favourite: req.body.favourite,
          isHold: req.body.isHold,
          "dtr.isDtr": req.body.isDtr,
          "dtr.date": req.body.dtrDate,
          backColour: colours.back,
          fontColour: colours.font,
        }
      );
      if (req.body.favourite) {
        const user = await User.findOne({ _id: req.userData.userId });
        const userFav = user.favourites.filter((fav) => {
          fav.ref === req.body.ref;
        });
        if (userFav.length === 0) {
          user.favourites.push({ ref: req.body.ref });
        }
        user.save();
      } else {
        const user = await User.findOne({ _id: req.userData.userId });
        const index = user.favourites.findIndex(
          (shipment) => shipment.ref === req.body.ref
        );
        if (index > -1) {
          user.favourites.splice(index, 1);
        }
        user.save();
      }

      return true;
    } catch {
      return false;
    }
  } else {
    try {
      const shipment = await Shipment.findOne({ref: req.body.ref});
      const colours = await findColours(shipment, req.userData.userId);
      await Shipment.findOneAndUpdate(
        {
          ref: req.body.ref,
          creator: req.userData.userId,
        },
        {
          "mbl.isSurr": req.body.isMblSurr,
          "mbl.date": req.body.mblSurrDate,
          "hbl.isSurr": req.body.isHblSurr,
          "hbl.date": req.body.hblSurrDate,
          "stepOne.isDone": req.body.isStepOneDone,
          "stepOne.date": req.body.stepOneValue,
          "stepTwo.isDone": req.body.isStepTwoDone,
          "stepTwo.date": req.body.stepTwoValue,
          "stepThree.isDone": req.body.isStepThreeDone,
          "stepThree.date": req.body.stepThreeValue,
          "stepFour.isDone": req.body.isStepFourDone,
          "stepFour.date": req.body.stepFourValue,
          "stepFive.isDone": req.body.isStepFiveDone,
          "stepFive.date": req.body.stepFiveValue,
          "stepSix.isDone": req.body.isStepSixDone,
          "stepSix.date": req.body.stepSixValue,
          "stepSeven.isStart": req.body.isStepSevenStart,
          "stepSeven.isEnd": req.body.isStepSevenEnd,
          "stepSeven.startDate": req.body.stepSevenStartValue,
          "stepSeven.endDate": req.body.stepSevenEndValue,
          favourite: req.body.favourite,
          isHold: req.body.isHold,
          "dtr.isDtr": req.body.isDtr,
          "dtr.date": req.body.dtrDate,
          backColour: colours.back,
          fontColour: colours.font,
        }
      );

      if (req.body.favourite) {
        const user = await User.findOne({ _id: req.userData.userId });
        const userFav = user.favourites.filter((fav) => {
          return fav.ref === req.body.ref;
        });
        if (userFav.length === 0) {
          user.favourites.push({ ref: req.body.ref });
        }
        user.save();
      } else {
        const user = await User.findOne({ _id: req.userData.userId });
        const index = user.favourites.findIndex(
          (shipment) => shipment.ref === req.body.ref
        );
        if (index > -1) {
          user.favourites.splice(index, 1);
        }
        user.save();
      }

      return true;
    } catch(err) {
      console.log(err);
      return false;
    }
  }
};

exports.saveHandling = saveHandling;
