const fs = require("fs");
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
        // console.log(req.body);
        const id = req.user.id;
        const { title, description, location, dateStart, dateEnd, capacity } =
            req.body;
        const result1 = cloudinary.uploader.upload(req.files[0].path);
        const result2 = cloudinary.uploader.upload(req.files[1].path);
        const result3 = cloudinary.uploader.upload(req.files[2].path);
        const resultAll = await Promise.all([result1, result2, result3]);
        const image1 = resultAll[0].secure_url;
        const image2 = resultAll[1].secure_url;
        const image3 = resultAll[2].secure_url;

        const event = await Event.create({
            title,
            description,
            location,
            dateStart,
            dateEnd,
            capacity,
            image1,
            image2,
            image3,
            userId: id,
            eventCategoryId: 1,
            latitude: 1,
            longitude: 1,
        });

        const modifyEvent = JSON.parse(JSON.stringify(event));

        const result = await JoinEventUser.create({
            eventId: modifyEvent.id,
            userId: modifyEvent.userId,
        });
        res.status(200).json({ message: "create sucessfully" });
    } catch (err) {
        next(err);
    } finally {
        if (req.files[0].path && req.files[1].path && req.files[2].path) {
            fs.unlinkSync(req.files[0].path);
            fs.unlinkSync(req.files[1].path);
            fs.unlinkSync(req.files[2].path);
        }
    }
};

exports.getNextEvent = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = await JoinEventUser.findAll({
            where: { userId: id },
            include: { model: Event },
        });
        // console.log(result);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};
