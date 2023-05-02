const User = require("../models/User");

const getProfileHandler = async (req) => {
  const user = await User.findOne({ _id: req.userData.userId });
  if (user !== null) {
    return {
      result: true,
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        organisation: user.organisation,
        fontBase: user.preferences.fontBase,
        backBase: user.preferences.backBase,
        fontOne: user.preferences.fontOne,
        backOne: user.preferences.backOne,
        fontTwo: user.preferences.fontTwo,
        backTwo: user.preferences.backTwo,
        fontThree: user.preferences.fontThree,
        backThree: user.preferences.backThree,
        fontFour: user.preferences.fontFour,
        backFour: user.preferences.backFour,
        fontFive: user.preferences.fontFive,
        backFive: user.preferences.backFive,
        fontSix: user.preferences.fontSix,
        backSix: user.preferences.backSix,
        fontSevenStart: user.preferences.fontSevenStart,
        backSevenStart: user.preferences.backSevenStart,
        fontSevenEnd: user.preferences.fontSevenEnd,
        backSevenEnd: user.preferences.backSevenEnd,
        fontComplete: user.preferences.fontComplete,
        backComplete: user.preferences.backComplete
      },
    };
  } else {
    return { result: false, message: "Please log in and try again!" };
  }
};

exports.getProfileHandler = getProfileHandler;
