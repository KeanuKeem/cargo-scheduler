const User = require("../models/User");
const bcrypt = require("bcrypt");

const checkPassword = async (req) => {
  const user = await User.findOne({ _id: req.userData.userId });
  if (user !== null) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(req.body.password, user.password, (err, save) => {
        if (err) {
          reject(err);
        } else {
          resolve(save);
        }
      });
    });
  } else {
    return false;
  }
};

exports.checkPassword = checkPassword;
