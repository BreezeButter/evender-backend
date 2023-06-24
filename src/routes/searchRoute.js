const express = require("express");
router = express.Router();

const searchEventController = require("../controller/searchEventController");

router.get("/filter", searchEventController.getSearch);
router.get("/place", searchEventController.palaceProvince);

module.exports = router;
