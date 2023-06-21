const express = require("express");
const router = express.Router();
const detailEventController = require("../controller/detailEventController");

// router.get("/detailEvent", detailEventController);
router.get("/:id", detailEventController.getDetailUserById);
router.get("/user/:id", detailEventController.getUserHostEventById);
module.exports = router;
