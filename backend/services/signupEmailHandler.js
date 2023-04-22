require("dotenv").config();
const nodemailer = require("nodemailer");
const { validityCodeGenerator } = require("./validityCodeGenerator");

const signupEmailHandler = (email) => {
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
    subject: "Cargo Scheduler: please enter this verification code",
    text:
      "Thanks for showing your interest in Cargo Scheduler!\n\n" +
      "Please enter this validity code: " +
      validityCodeGenerator(email) +
      "\n\n Please note, verficiation code lasts 2 minutes!",
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.signupEmailHandler = signupEmailHandler;
