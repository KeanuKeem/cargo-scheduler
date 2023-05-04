const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

const loginCheckHandler = async (req) => {
  const user = await User.findOne({ username: req.body.username });
  const now = new Date();

  if (user !== null) {
    if (user.expiryDate < now) {
      return { result: false, message: "Sorry your account is expired!" };
    } else {
      let token;
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (valid) {
        token = jwt.sign({ userId: user._id }, process.env.SESSION_KEY, {
          expiresIn: "1h",
        });
        return { result: true, json: { userId: user._id, token: token } };
      } else {
        return {
          result: false,
          message: "Username and Password does not match!",
        };
      }
    }
  } else {
    return { result: false, message: "Username does not exist!" };
  }
};

exports.loginCheckHandler = loginCheckHandler;
