const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

const {
  createAccountStepOne,
  createAccountStepTwo,
} = require("../services/createAccountHandler");
const { loginCheckHandler } = require("../services/loginCheckHandler");
const { findUsernameHandler } = require("../services/findUsernameHandler");
const { findPasswordStageOne } = require("../services/findPasswordStageOne");
const {
  findPasswordEmailHandler,
} = require("../services/findPasswordEmailHandler");
const { findPasswordStageTwo } = require("../services/findPasswordStageTwo");
const { getProfileHandler } = require("../services/getProfileHandler");
const { checkPassword } = require("../services/checkPassword");
const { updateProfileHandler } = require("../services/updateProfileHandler");
const {
  updatePreferenceHandler,
} = require("../services/updatePreferenceHandler");

const createAccount = async (req, res) => {
  if (req.body.validity === "one") {
    const output = await createAccountStepOne(req);
    if (output.result) {
      res.status(200).send(output.response);
    } else {
      res.status(500).send(output.response);
    }
  }
  if (req.body.validity === "two") {
    const outputTwo = await createAccountStepTwo(req);
    if (outputTwo.result) {
      res.status(200).json(outputTwo.json);
    } else {
      res.status(500).send(outputTwo.response);
    }
  }
};

const loginHandler = async (req, res) => {
  const output = await loginCheckHandler(req); 
  if (output.result) {
    res.status(200).json(output.json);
  } else {
    res.status(500).send(output.message);
  }
};

const findUsername = async (req, res) => {
  try {
    const condition = await findUsernameHandler(
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.organisation
    );

    if (condition) {
      res.status(200).send("");
    } else {
      res.status(500).send("Your details don't match, please try again!");
    }
  } catch (err) {
    res.status(500).send("Server Error! Please try again");
  }
};

const findPassword = async (req, res) => {
  try {
    const stage = req.body.stage;
    if (stage === "ONE") {
      const condition = await findPasswordStageOne(
        req.body.username,
        req.body.email,
        req.body.organisation
      );
      if (condition) {
        findPasswordEmailHandler(req.body.email, req.body.username);
        res.status(200).send("TWO");
      } else {
        res.status(500).send("Your details don't match, please try again!");
      }
    }

    if (stage === "TWO") {
      const message = await findPasswordStageTwo(
        req.body.username,
        req.body.email,
        req.body.organisation,
        req.body.verification,
        req.body.password
      );
      if (message === "Password Saved") {
        res.status(200).send("");
      } else if (message === "Password unsaved") {
        res.status(500).send("Password could not saved, please try again!");
      } else {
        res.status(500).send(message);
      }
    }
  } catch (err) {
    res.status(500).send("Server Error, please try again!");
  }
};

const getUserProfile = async (req, res) => {
  const output = await getProfileHandler(req);
  if (output.result) {
    res.status(200).send(output.data);
  } else {
    res.status(500).send(output.message);
  }
};

const updateProfile = async (req, res) => {
  const passwordMatch = await checkPassword(req);
  if (passwordMatch) {
    try {
      const output = await updateProfileHandler(req);
      if (output.result) {
        res.status(200).send(output.message);
      } else {
        res.status(500).send(output.message);
      }
    } catch {
      res.status(500).send("Server Error! Please try again later");
    }
  } else {
    res.status(500).send("Password does not match!");
  }
};

const updatePreference = async (req, res) => {
  const output = await updatePreferenceHandler(req);
  if (output.result) {
    res.status(200).send(output.message);
  } else {
    res.status(500).send(output.message);
  }
};

const getFavourites = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userData.userId });
    res.status(200).send(user.favourites);
  } catch {
    res.status(500).send("Please log in and try again!");
  }
};

exports.createAccount = createAccount;
exports.loginHandler = loginHandler;
exports.findUsername = findUsername;
exports.findPassword = findPassword;
exports.getUserProfile = getUserProfile;
exports.updateProfile = updateProfile;
exports.updatePreference = updatePreference;
exports.getFavourites = getFavourites;
