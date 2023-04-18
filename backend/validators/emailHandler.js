require("dotenv").config();
const nodemailer = require("nodemailer");
const { validityCodeGenerator } = require("./validityCodeGenerator");

const emailHandler = (email) => {
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
    subject: "Cargo Scheduler: please enter this validity code",
    text:
      "Thanks for showing your interest in Cargo Scheduler!\n\n" +
      "Please enter this validity code: " +
      validityCodeGenerator(email),
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.emailHandler = emailHandler;
