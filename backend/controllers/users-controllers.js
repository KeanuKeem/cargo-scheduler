const bcrypt = require("bcrypt");
const User = require("../models/User");
const signupValidators = require("../validators/signupValidator");
const { validityCodeChecker } = require("../validators/validityCodeGenerator");
const { emailHandler } = require("../validators/emailHandler");

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
      emailHandler(req.body.email);
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
            res.status(200).send(result.status);
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

exports.createAccount = createAccount;
