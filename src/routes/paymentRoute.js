const express = require("express");
const authenticate = require("../middlewares/authenticate");
const paymentController = require("../controller/paymentController");
const router = express.Router();
const paymentMiddleware = require("../middlewares/paymentStripe");

router.post(
    "/create-payment",
    //paymentMiddleware,
    //authenticate,
    paymentController.createPayment
);
router.get("/session", paymentController.payment);
//router.patch("/boostEvent", authenticate, paymentController.upBoostPost);

module.exports = router;
