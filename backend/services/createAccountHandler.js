const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

const signupValidators = require("./signupValidator");
const { signupEmailHandler } = require("./signupEmailHandler");
const { validityCodeChecker } = require("./validityCodeGenerator");

const createAccountStepOne = async (req) => {
  const usernameMessage = await signupValidators.usernameValidator(
    req.body.username
  );
  const passwordMessage = signupValidators.passwordValidator(req.body.password);
  const firstnameMessage = signupValidators.firstnameValidator(
    req.body.firstname
  );
  const lastnameMessage = signupValidators.lastnameValidator(req.body.lastname);
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
    return { result: true, response };
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
    return { result: false, response };
  }
};

const createAccountStepTwo = async (req) => {
  const usernameMessage = await signupValidators.usernameValidator(
    req.body.username
  );
  const passwordMessage = signupValidators.passwordValidator(req.body.password);
  const firstnameMessage = signupValidators.firstnameValidator(
    req.body.firstname
  );
  const lastnameMessage = signupValidators.lastnameValidator(req.body.lastname);
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
    const isValid = validityCodeChecker(req.body.email, req.body.emailValidity);
    if (isValid) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const now = new Date();
      const newAccount = new User({
        username: req.body.username,
        password: hashedPassword,
        firstname:
          req.body.firstname.charAt(0).toUpperCase() +
          req.body.firstname.slice(1, req.body.firstname.length),
        lastname:
          req.body.lastname.charAt(0).toUpperCase() +
          req.body.lastname.slice(1, req.body.firstname.length),
        email: req.body.email,
        organisation:
          req.body.organisation.charAt(0).toUpperCase() +
          req.body.organisation.slice(1, req.body.organisation.length),
        expiryDate: new Date(now.getTime() + 24 * 60 * 60 * 1000),
      });
      try {
        newAccount.save();
        let token;
        token = jwt.sign(
          { userID: newAccount.username },
          process.env.SESSION_KEY,
          { expiresIn: "1h" }
        );
        return {
          result: true,
          json: { userId: newAccount.username, token: token },
        };
      } catch {
        return {
          result: false,
          response: "Could not register, please try again",
        };
      }
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
      return { result: false, response };
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
    return { result: false, response };
  }
};

exports.createAccountStepOne = createAccountStepOne;
exports.createAccountStepTwo = createAccountStepTwo;
