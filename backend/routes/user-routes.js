const express = require("express");
const usersControllers = require("../controllers/users-controllers");
const router = express.Router();
const checkAuth = require("../services/check-auth");

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

router.use(checkAuth);

router.get(
    "/",
    usersControllers.getUserProfile
);

router.get(
    "/fav",
    usersControllers.getFavourites
);

router.patch(
    "/edit/profile",
    usersControllers.updateProfile
);

router.patch(
    "/edit/pref",
    usersControllers.updatePreference
);

module.exports = router;