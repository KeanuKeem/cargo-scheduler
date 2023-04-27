const User = require("../models/User");

const updateProfileHandler = async (req) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.userData.userId },
      {
        firstname:
          req.body.firstname.charAt(0).toUpperCase() +
          req.body.firstname.slice(1),
        lastname:
          req.body.lastname.charAt(0).toUpperCase() +
          req.body.lastname.slice(1),
        organisation:
          req.body.organisation.charAt(0).toUpperCase() +
          req.body.organisation.slice(1),
      }
    );
    return { result: true, message: "Successfully updated!" };
  } catch {
    return { result: false, message: "Could not update, please try again!" };
  }
};

exports.updateProfileHandler = updateProfileHandler;
