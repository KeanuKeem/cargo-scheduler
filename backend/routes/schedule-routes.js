const express = require("express");
const schedulesControllers = require("../controllers/schedules-controllers");
const router = express.Router();

router.post("/", schedulesControllers.createSchedule);

router.get("/", schedulesControllers.getSchedule);

router.post("/edit", schedulesControllers.updateSchedule);

router.delete("/", schedulesControllers.deleteSchedule);

module.exports = router;
