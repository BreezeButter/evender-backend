const uploadService = require("../services/upload-service");
const fs = require("fs");
const { User, Event } = require("../models");

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
    } catch (err) {
        next(err);
    }
};
exports.getUserHostEventById = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(req.params);
        const event = await Event.findAll({
            where: { userId: id },
            include: { model: User },
        });
        res.status(200).json(event);
    } catch (err) {
        next(err);
    }
};

// exports.fetchUser = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         console.log(HELLLO, id);
//         const userProfile = await User.findOne({
//             where: { id: id },
//         });

//         res.status(200).json(userProfile);
//     } catch (err) {
//         next(err);
//     }
// };
