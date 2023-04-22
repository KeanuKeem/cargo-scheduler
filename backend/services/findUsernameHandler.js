const User = require("../models/User");
const {
  findUsernameEmailHandler,
} = require("../services/findUsernameEmailHandler");

const findUsernameHandler = async (
  firstname,
  lastname,
  email,
  organisation
) => {
  const user = await User.findOne({
    firstname,
    lastname,
    email,
    organisation,
  });
  if (user !== null) {
    findUsernameEmailHandler(email, user.username);
    return true;
  } else {
    return false;
  }
};

exports.findUsernameHandler = findUsernameHandler;
