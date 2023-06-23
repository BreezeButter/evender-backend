const express = require("express");
router = express.Router();

const searchEventController = require("../controller/searchEventController");

router.get("/category/:input", searchEventController.getEventByCategory);

module.exports = router;
