const express = require("express");
router = express.Router();

const searchEventController = require("../controller/searchEventController");

router.post("/filter", searchEventController.getSearch);
router.get("/place", searchEventController.palaceProvince);

module.exports = router;
