const express = require("express");
const eventController = require("../controller/eventController");

const router = express.Router();

router.get("/getAllEvents", eventController.getAllEvents);
router.post("/createEvent", eventController.createEvent);
module.exports = router;
