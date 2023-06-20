const express = require("express");
const eventController = require("../controller/eventController");

const router = express.Router();

router.get("/getAllEvents", eventController.getAllEvents);
module.exports = router;
