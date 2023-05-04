const User = require("../models/User");

const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const usernameValidator = async (username) => {
  const user = await User.findOne({username});
  if (username === "") {
    return "Username must not be empty!";
  } else if (username.length < 6) {
    return "Username must be more than 5 characters!";
  } else if (regex.test(username)) {
    return "Username must not have special characters!";
  } else if (user !== null) {
    return "User already Exists!";
  } else {
    return "";
  }
};

const passwordValidator = (password) => {
  if (password === "") {
    return "Password must not be empty!";
  } else if (password.length < 7) {
    return "Password must be more than 6 characters!";
  } else if (!regex.test(password)) {
    return "Password must contain a special character!";
  } else {
    return "";
  }
};

const firstnameValidator = (firstname) => {
  if (firstname === "") {
    return "Firstname must not be empty!";
  } else if (regex.test(firstname)) {
    return "Firstname must not contain a special character!";
  } else {
    return "";
  }
};

const lastnameValidator = (lastname) => {
  if (lastname === "") {
    return "Lastname must not be empty!";
  } else if (regex.test(lastname)) {
    return "Lastname must not contain a special character!";
  } else {
    return "";
  }
};

const organisationValidator = (organisation) => {
  if (organisation === "") {
    return "Organisation name must not be empty!";
  } else if (regex.test(organisation)) {
    return "Organisation name must not contain a special character!";
  } else {
    return "";
  }
};

const emailValidator = async (email) => {
  const userEmail = await User.findOne({email});
  if (email === "") {
    return "Email must not be empty!";
  } else if (userEmail !== null) {
    return "Email already exists!";
  } else {
    return "";
  }
};

exports.usernameValidator = usernameValidator;
exports.passwordValidator = passwordValidator;
exports.firstnameValidator = firstnameValidator;
exports.lastnameValidator = lastnameValidator;
exports.organisationValidator = organisationValidator;
exports.emailValidator = emailValidator;
