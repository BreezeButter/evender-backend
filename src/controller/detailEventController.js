const { JoinEventUser, User, Event } = require("../models");
const cloudinary = require("../config/cloudinary");
const { where } = require("sequelize");
const { Op } = require("sequelize");

exports.getDetailUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(req.params);
        const event = await Event.findOne({
            where: { id: id },
            include: { model: JoinEventUser, include: User },
        });
        res.status(200).json(event);
    } catch (err) {
        next(err);
    }
};
exports.getUserHostEventById = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(req.params);
        const event = await Event.findOne({
            where: { id: id },
            include: { model: User },
        });

        res.status(200).json(event);
    } catch (err) {
        next(err);
    }
};

exports.updateEventDetail = async (req, res, next) => {
    // res.json("hello");
    // console.log(req.file);

    const { id } = req.params;
    // const {
    //     title,
    //     description,
    //     dateStart,
    //     dateEnd,
    //     capacity,
    //     lat,
    //     lng,
    //     placeId,
    //     placeName,
    //     placeProvince,
    //     placeCountry,
    // } = req.body;

    // console.log(req.files);
    let image = [];
    for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        image.push(result.secure_url);
        console.log(result);
    }
    // console.log(typeof req.body.dateStart, req.body.dateStart);
    Event.update(
        {
            title: req.body.title,
            description: req.body.description,
            placeProvince: req.body.placeProvince,
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd,
            capacity: req.body.capacity,
            latitude: req.body.lat,
            longitude: req.body.lng,
            placeId: req.body.placeId,
            placeName: req.body.placeName,
            placeCountry: req.body.placeCountry,


            image1: image[0],
            image2: image[1],
            image3: image[2],
        },
        { where: { id: id } }
    )
        .then((rs) => {
            res.status(200).json(rs);
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });

    console.log(Event.update)

};

exports.createEventJoin = async (req, res, next) => {
    try {
        const value = req.params;
        console.log(value);
        value.userId = req.user.id;

        const checkUserInEvent = await JoinEventUser.findOne({
            where: {
                [Op.and]: [{ eventId: +value.id }, { userId: value.userId }],
            },
        });

        const check = !!checkUserInEvent;

        if (check) {
            res.status(200).json({ eventId: checkUserInEvent.eventId });
        } else {
            const event = await JoinEventUser.create({
                eventId: value.id,
                userId: value.userId,
            });
            res.status(200).json({ eventId: event.eventId });
        }
    } catch (err) {
        next(err);
    }
};
exports.leaveJointEvent = async (req, res, next) => {
    try {
        const value = req.params;
        console.log(value);
        value.userId = req.user.id;

        const destroyUser = await JoinEventUser.destroy({
            where: {
                [Op.and]: [{ eventId: +value.id }, { userId: value.userId }],
            },
        });
        res.status(200).json(destroyUser);
    } catch (err) {
        next(err);
    }
};
exports.eventJoined = async (req, res, next) => {
    try {
        const value = req.params;
        value.userId = req.user.id;
        console.log("req.params======>", req.params);
        console.log("value======>", value);

        const userJoined = await JoinEventUser.findOne({
            where: {
                [Op.and]: [{ eventId: +value.id }, { userId: value.userId }],
            },
        });

        res.status(200).json(!!userJoined);
    } catch (err) {
        next(err);
    }
};
exports.deleteEvent = async (req, res, next) => {
    try {
        const value = req.params;
        value.userId = req.user.id;
        console.log("value======>", value);
        const eventDel = await Event.destroy({
            where: {
                [Op.and]: [{ id: +value.id }, { userId: value.userId }],
            },
        });

        console.log("Delsuccess", eventDel);
        res.status(200).json(eventDel);
    } catch (err) {
        next(err);
    }
};
