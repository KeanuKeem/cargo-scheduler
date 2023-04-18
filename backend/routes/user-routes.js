const express = require("express");
const usersControllers = require("../controllers/users-controllers");
const router = express.Router();

router.post(
    "/signup",
    usersControllers.createAccount
);

module.exports = router;