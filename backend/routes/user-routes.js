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

router.post(
    "/findUser",
    usersControllers.findUsername
);

router.post(
    "/findPass",
    usersControllers.findPassword
);

module.exports = router;