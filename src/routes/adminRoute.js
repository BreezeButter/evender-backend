const express = require("express");
const authenticate = require("../middlewares/authenticate");

const adminController = require("../controller/adminController");
const upload = require("../middlewares/upload");
const paymentMiddleware = require("../middlewares/paymentStripe");

const router = express.Router();

router.post(
    "/adminCreateEvent",
    authenticate,
    upload.array("image"),

    adminController.createEvent
);
router.get("/showAllEvent", adminController.showEvent);
router.delete(
    "/adminDeleteEvent/:id",
    authenticate,
    adminController.deleteEvent
);

router.get("/showAllUser", adminController.showUser);
router.patch("/adminBanUser/:id", adminController.banUser);
router.patch("/adminUnBanUser/:id", adminController.unBanUser);

module.exports = router;
