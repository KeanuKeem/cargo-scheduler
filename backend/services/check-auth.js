const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(440).send("Session expired! please log in again!");
    }
    const decodedToken = jwt.verify(token, process.env.SESSION_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch {
    res.status(440).send("Session expired! please log in again!");
  }
};
