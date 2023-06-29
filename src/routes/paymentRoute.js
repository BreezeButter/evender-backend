const express = require("express");
const authenticate = require("../middlewares/authenticate");
const paymentController = require("../controller/paymentController");
const router = express.Router();
const paymentMiddleware = require("../middlewares/paymentStripe");

//router.get("/getAllEvents", eventController.getAllEvents);
router.post(
    "/create-payment",
    paymentMiddleware,
    //authenticate,
    paymentController.createPayment
);

module.exports = router;
