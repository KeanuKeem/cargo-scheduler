const Shipment = require("../models/Shipment");

const saveHandling = async (req) => {
  try {
    await Shipment.findOneAndUpdate(
      {
        ref: req.body.ref,
        creator: req.userData.userId,
      },
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
    );
    return true;
  } catch {
    return false;
  }
};

exports.saveHandling = saveHandling;
