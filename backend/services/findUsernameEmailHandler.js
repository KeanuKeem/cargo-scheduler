require("dotenv").config();
const nodemailer = require("nodemailer");

const findUsernameEmailHandler = (email, username) => {
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
    subject: "Cargo Scheduler: Your account username with Cargo Scheduler",
    text:
      "Hi there!\n\n" +
      "Your account username with Cargo Scheduler is " + username +
      ". \n\nPlease use this username to log in!"
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.findUsernameEmailHandler = findUsernameEmailHandler;
