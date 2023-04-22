require("dotenv").config();
const nodemailer = require("nodemailer");
const { validityCodeGenerator } = require("../services/validityCodeGenerator");

const findPasswordEmailHandler = async (email, username) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cargo.scheduler@gmail.com",
      pass: process.env.GMAIL_PW,
    },
  });

  const mailOptions = {
    from: "cargo.scheduler@gmail.com",
    to: email,
    subject: "Cargo Scheduler: Your Verification Code, " + username,
    text:
      "Hi there!\n\n" +
      "Your verification code to change password is " +
      validityCodeGenerator(email) +
      ". \n\nPlease use this code to change your password! \n\n Please note, verficiation code lasts 2 minutes!",
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.findPasswordEmailHandler = findPasswordEmailHandler;
