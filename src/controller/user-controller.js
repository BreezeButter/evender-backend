const uploadService = require("../services/upload-service");
const fs = require("fs");
const { User } = require("../models");

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.user;
        const result = await uploadService.upload(req.file.path);
        const { firstName, lastName, gender, bdate, aboutMe } = req.body;

        const update = await User.update(
            {
                firstName,
                lastName,
                gender,
                bdate,
                aboutMe,
                image: result.secure_url,
            },
            {
                where: { id: id },
            }
        );

        res.status(200).json(update);
        // console.log("hellooooooooooooooooooooooooooooooooooo")
    } catch (err) {
        next(err);
    }
};

// exports.uploadImage = async (req, res, next) => {
//     try {
//         console.log('----->im', req.files.image)
//         if (!req.files.image) {
//             console.log('errorrrrr')
//             createError('profile image is required.')
//         }
//         const updateValue = {}
//         const result = await uploadService.upload(req.files.image[0].path);
//         updateValue.image = result.secure_url
//         console.log('response', updateValue)
//         await User.update(updateValue, { where: { id: req.user.id } })
//         res.status(200).json(updateValue)
//     } catch (err) {
//         next(err);
//     } finally {
//         if (req.files.image) {
//             fs.unlinkSync(req.files.image[0].path)
//         }
//     }
// };
