const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const detailEventController = require("../controller/detailEventController");
const authenticate = require("../middlewares/authenticate");

// router.get("/detailEvent", detailEventController);
router.get("/:id", detailEventController.getDetailUserById);
router.get("/user/:id", detailEventController.getUserHostEventById);
router.post("/:id", authenticate, detailEventController.createEventJoin);
router.put(
    "/updateDetailEvent/:id",
    upload.array("image"),
    detailEventController.updateEventDetail
);
module.exports = router;
