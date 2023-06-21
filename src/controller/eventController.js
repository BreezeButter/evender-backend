const { Event, JoinEventUser, User } = require("../models");
const cloudinary = require("../config/cloudinary");

exports.getAllEvents = async (req, res, next) => {
    try {
        console.log("hello");
        const events = await Event.findAll({
            include: { model: JoinEventUser, include: User },
        });
        // console.log(result);
        res.status(200).json({ events });
    } catch (err) {
        next(err);
    }
};

exports.createEvent = async (req, res, next) => {
    try {
        const result1 = cloudinary.uploader.upload(req.files[0].path);
        const result2 = cloudinary.uploader.upload(req.files[1].path);
        const result3 = cloudinary.uploader.upload(req.files[2].path);
        const resultAll = await Promise.all([result1, result2, result3]);

        res.status(200).json(resultAll[0]);
    } catch (err) {
        next(err);
    }
};
