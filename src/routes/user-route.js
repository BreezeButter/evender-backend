const express = require("express");
const upload = require('../middlewares/upload')
const userController = require('../controller/user-controller')
const authenticate = require('../middlewares/authenticate')

router = express.Router();

router.put('/updateUser', authenticate,
    upload.single('image'), userController.updateUser)



// router.patch('/image/:id',
// authenticate,
// upload.fields([
//     { name: 'profileImage', maxCount: 1 },
// ]),
//     userController.uploadImage)

module.exports = router;