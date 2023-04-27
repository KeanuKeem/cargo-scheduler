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
      },
    };
  } else {
    return { result: false, message: "Please log in and try again!" };
  }
};

exports.getProfileHandler = getProfileHandler;
