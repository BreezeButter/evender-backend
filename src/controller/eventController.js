const fs = require("fs");
const { Event, JoinEventUser, User, Chat, sequelize } = require("../models");
const cloudinary = require("../config/cloudinary");
const stripe = require("stripe")(
    "sk_test_51NM49zIQqnWPmtA0GztvWndWPnW58Y8LGkwn4APwhL8RhSC0XwrtCkPLUJF1tf6ROHjvJ1ORoQNn0UbsP9Xq0aj100Xzai2BB0"
);

exports.getAllEvents = async (req, res, next) => {
    try {
        console.log("hello");
        const events = await Event.findAll({
            include: { model: JoinEventUser, include: User },
            order: [["isBoost", "DESC"]],
        });
        // console.log(result);
        res.status(200).json({ events });
    } catch (err) {
        next(err);
    }
};

exports.createEvent = async (req, res, next) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const id = req.user.id;
            const {
                title,
                description,
                dateStart,
                dateEnd,
                capacity,
                lat,
                lng,
                placeId,
                placeName,
                placeProvince,
                placeCountry,
            } = req.body;

            console.log(req.body);

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
                eventCategoryId: 1,
                latitude: lat,
                longitude: lng,
                placeId,
                placeName,
                placeProvince,
                placeCountry,
            });
            const modifyEvent = JSON.parse(JSON.stringify(event));
            const result = await JoinEventUser.create({
                eventId: modifyEvent.id,
                userId: modifyEvent.userId,
            });
            const product = await stripe.products.create({
                name: title,
                default_price_data: {
                    currency: "USD",
                    unit_amount_decimal: "249.00",
                },
            });
            const resultStripe = await Event.update(
                {
                    productDefaultPrice: product.default_price,
                },
                {
                    where: { id: event.id },
                }
            );
            return res
                .status(200)
                .json({ message: "create sucessfully", resultStripe });
        });

        res.status(200).json({ meg: "create sucessfully" });
    } catch (err) {
        next(err);
        // } finally {
        //     if (req.files[0].path && req.files[1].path && req.files[2].path) {
        //         fs.unlinkSync(req.files[0].path);
        //         fs.unlinkSync(req.files[1].path);
        //         fs.unlinkSync(req.files[2].path);
        //     }
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
exports.getJoinEventByUser = async (req, res, next) => {
    try {
        const id = req.user.id;
        const events = await JoinEventUser.findAll({
            where: { userId: id },
            include: Event,
        });
        res.status(200).json({ events });
    } catch (err) {
        next(err);
    }
};

exports.getChatByEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const chats = await Chat.findAll({
            where: { eventId: id },
            include: User,
        });
        res.status(200).json({ chats });
    } catch (err) {
        next(err);
    }
};
