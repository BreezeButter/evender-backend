const express = require("express");
const upload = require('../middlewares/upload')
const userController = require('../controller/user-controller')
const authenticate = require('../middlewares/authenticate')

router = express.Router();

router.get("/allevent/:id", userController.getUserHostEventById);
router.put('/updateUser', authenticate,
    upload.single('image'), userController.updateUser)


module.exports = router;