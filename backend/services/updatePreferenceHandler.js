const User = require("../models/User");

const updatePreferenceHandler = async (req) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.userData.userId },
      {
        preferences: {
          fontBase: req.body.fontBase,
          backBase: req.body.backBase,
          fontOne: req.body.fontOne,
          backOne: req.body.backOne,
          fontTwo: req.body.fontTwo,
          backTwo: req.body.backTwo,
          fontThree: req.body.fontThree,
          backThree: req.body.backThree,
          fontFour: req.body.fontFour,
          backFour: req.body.backFour,
          fontFive: req.body.fontFive,
          backFive: req.body.backFive,
          fontSix: req.body.fontSix,
          backSix: req.body.backSix,
          fontSevenStart: req.body.fontSevenStart,
          backSevenStart: req.body.backSevenStart,
          fontSevenEnd: req.body.fontSevenEnd,
          backSevenEnd: req.body.backSevenEnd,
        },
      }
    );
    return { result: true, message: "Successfully Updated!" };
  } catch {
    return { result: false, message: "Please log in and try again!" };
  }
};

exports.updatePreferenceHandler = updatePreferenceHandler;
