const express = require("express");
const usersControllers = require("../controllers/users-controllers");
const router = express.Router();

router.post(
    "/signup",
    usersControllers.createAccount
);

router.post(
    "/login",
    usersControllers.loginHandler
);

module.exports = router;