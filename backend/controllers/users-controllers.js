const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const signupValidators = require("../services/signupValidator");
const { validityCodeChecker } = require("../services/validityCodeGenerator");
const { signupEmailHandler } = require("../services/signupEmailHandler");
const { findUsernameHandler } = require("../services/findUsernameHandler");
const { findPasswordStageOne } = require("../services/findPasswordStageOne");
const {
  findPasswordEmailHandler,
} = require("../services/findPasswordEmailHandler");
const { findPasswordStageTwo } = require("../services/findPasswordStageTwo");
const { getProfileHandler } = require("../services/getProfilehandler");
const { checkPassword } = require("../services/checkPassword");
const { updateProfileHandler } = require("../services/updateProfileHandler");
const { updatePreferenceHandler } = require("../services/updatePreferenceHandler");

const createAccount = async (req, res) => {
  if (req.body.validity === "one") {
    const usernameMessage = await signupValidators.usernameValidator(
      req.body.username
    );
    const passwordMessage = signupValidators.passwordValidator(
      req.body.password
    );
    const firstnameMessage = signupValidators.firstnameValidator(
      req.body.firstname
    );
    const lastnameMessage = signupValidators.lastnameValidator(
      req.body.lastname
    );
    const organisationMessage = signupValidators.organisationValidator(
      req.body.organisation
    );
    const emailMessage = await signupValidators.emailValidator(req.body.email);

    if (
      usernameMessage === "" &&
      passwordMessage === "" &&
      firstnameMessage === "" &&
      lastnameMessage === "" &&
      organisationMessage === "" &&
      emailMessage === ""
    ) {
      signupEmailHandler(req.body.email);
      const response = {
        username: usernameMessage,
        password: passwordMessage,
        firstname: firstnameMessage,
        lastname: lastnameMessage,
        organisation: organisationMessage,
        email: emailMessage,
        validity: "two",
      };
      res.status(200).send(response);
    } else {
      const response = {
        username: usernameMessage,
        password: passwordMessage,
        firstname: firstnameMessage,
        lastname: lastnameMessage,
        organisation: organisationMessage,
        email: emailMessage,
        validity: "one",
      };
      res.status(500).send(response);
    }
  }

  if (req.body.validity === "two") {
    const usernameMessage = await signupValidators.usernameValidator(
      req.body.username
    );
    const passwordMessage = signupValidators.passwordValidator(
      req.body.password
    );
    const firstnameMessage = signupValidators.firstnameValidator(
      req.body.firstname
    );
    const lastnameMessage = signupValidators.lastnameValidator(
      req.body.lastname
    );
    const organisationMessage = signupValidators.organisationValidator(
      req.body.organisation
    );
    const emailMessage = await signupValidators.emailValidator(req.body.email);
    if (
      usernameMessage === "" &&
      passwordMessage === "" &&
      firstnameMessage === "" &&
      lastnameMessage === "" &&
      organisationMessage === "" &&
      emailMessage === ""
    ) {
      const isValid = validityCodeChecker(
        req.body.email,
        req.body.emailValidity
      );
      if (isValid) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newAccount = new User({
          username: req.body.username,
          password: hashedPassword,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          organisation: req.body.organisation,
        });

        newAccount
          .save()
          .then((result) => {
            let token;
            token = jwt.sign(
              { userID: newAccount.username },
              process.env.SESSION_KEY,
              { expiresIn: "1h" }
            );
            res
              .status(200)
              .json({ userId: newAccount.username, token: token })
              .send(result.status);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      } else {
        const response = {
          username: usernameMessage,
          password: passwordMessage,
          firstname: firstnameMessage,
          lastname: lastnameMessage,
          organisation: organisationMessage,
          email: emailMessage,
          emailValidity: "Email Verification Code is not valid!",
          validity: "two",
        };
        res.status(500).send(response);
      }
    } else {
      const response = {
        username: usernameMessage,
        password: passwordMessage,
        firstname: firstnameMessage,
        lastname: lastnameMessage,
        organisation: organisationMessage,
        email: emailMessage,
        validity: "one",
      };
      res.status(500).send(response);
    }
  }
};

const loginHandler = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user !== null) {
    bcrypt.compare(req.body.password, user.password, (err, save) => {
      if (save) {
        let token;
        token = jwt.sign({ userId: user._id }, process.env.SESSION_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({ userId: user._id, token: token });
      } else {
        res.status(500).send("Username and Password does not match!");
      }
    });
  } else {
    res.status(500).send("Username does not exist!");
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
      console.log(message, "message");
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

exports.createAccount = createAccount;
exports.loginHandler = loginHandler;
exports.findUsername = findUsername;
exports.findPassword = findPassword;
exports.getUserProfile = getUserProfile;
exports.updateProfile = updateProfile;
exports.updatePreference = updatePreference;
