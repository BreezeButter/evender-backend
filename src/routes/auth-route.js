const express = require("express");
const authController = require("../controller/auth-controller");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logingoogle", authController.logingoogle);
router.get("/me", authenticate, authController.getMe);

module.exports = router;