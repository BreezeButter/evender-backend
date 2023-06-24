const express = require("express");
router = express.Router();

const searchEventController = require("../controller/searchEventController");

router.get("/filter", searchEventController.getSearch);

module.exports = router;
