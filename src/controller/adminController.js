const fs = require("fs");
const { Event, JoinEventUser, User } = require("../models");
const cloudinary = require("../config/cloudinary");

exports.createEvent = async (req, res, next) => {
    try {
        console.log("vvvvvvvv", req.body);
        const id = req.user.id;
        const {
            title,
            description,
            dateStart,
            dateEnd,
            capacity,
            eventCategoryId,
            latitude,
            longitude,
            placeName,
            placeProvince,
            placeContry,
            paymentLinkUrl,
            productDefaultPrice,

            //paymentlink:paymentLinkUrl
        } = req.body;

        if (!req.files || req.files.length < 3) {
            return res
                .status(400)
                .json({ message: "Missing files for upload" });
        }

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
            dateStart,
            dateEnd,
            capacity,
            image1,
            image2,
            image3,
            userId: id,
            eventCategoryId,
            latitude,
            longitude,
            placeName,
            placeProvince,
            placeContry,
            paymentLinkUrl,
            productDefaultPrice,
        });
        res.status(200).json({ message: "create sucessfully" });
    } catch (err) {
        next(err);
    } finally {
        if (req.files && req.files.length >= 3) {
            fs.unlinkSync(req.files[0].path);
            fs.unlinkSync(req.files[1].path);
            fs.unlinkSync(req.files[2].path);
        }
    }
};

exports.deleteEvent = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Event.destroy({ where: { id } });
        res.json({ message: "delete success" });
    } catch (error) {
        next(error);
    }
};

exports.showEvent = async (req, res, next) => {
    try {
        const isAdmin = req.user;
        const showevent = await Event.findAll();
        res.json(showevent);
    } catch (error) {
        next(error);
    }
};
