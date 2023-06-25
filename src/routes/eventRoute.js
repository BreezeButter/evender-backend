const express = require("express");
const eventController = require("../controller/eventController");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/getAllEvents", eventController.getAllEvents);
router.post(
    "/createEvent",
    authenticate,
    upload.array("image"),
    eventController.createEvent
);
module.exports = router;

router.get(
    "/getJoinEventByUser",
    authenticate,
    eventController.getJoinEventByUser
);

router.get("/getChatByEvent/:id", eventController.getChatByEvent);
