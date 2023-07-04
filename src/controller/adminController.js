const fs = require("fs");
const { Event, JoinEventUser, User, sequelize } = require("../models");
const cloudinary = require("../config/cloudinary");
const stripe = require("stripe")(
    "sk_test_51NM49zIQqnWPmtA0GztvWndWPnW58Y8LGkwn4APwhL8RhSC0XwrtCkPLUJF1tf6ROHjvJ1ORoQNn0UbsP9Xq0aj100Xzai2BB0"
);

exports.createEvent = async (req, res, next) => {
    try {
        const result = await sequelize.transaction(async (t) => {
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

            const product = await stripe.products.create({
                name: req.body.title,
                default_price_data: {
                    currency: "USD",
                    unit_amount_decimal: "249.00",
                },
            });

            console.log(
                "######product.default_price######",
                product.default_price
            );
            console.log("#####product#####", product);

            const paymentLink = await stripe.paymentLinks.create({
                line_items: [
                    {
                        price: product.default_price,
                        quantity: 1,
                        //paymentLinkUrl:paymentLink.url
                    },
                ],
            });
            const customer = await stripe.customers.create({
                metadata: {
                    event_id: event.id,
                    userId: req.user.id,
                },

                //paymentLinkUrl:paymentLink.url
            });

            console.log("#########", customer);
            const ok = await stripe.customers.update(`${customer.id}`, {
                metadata: {
                    event_id: event.id,
                    userId: req.user.id,
                },

                //paymentLinkUrl:paymentLink.url
            });

            const x = await Event.update(
                {
                    productDefaultPrice: product.default_price,
                    paymentLinkUrl: paymentLink.url,
                },
                {
                    where: { id: event.id },
                }
            );
            return res
                .status(200)
                .json({ message: "create sucessfully", customer });
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

exports.showUser = async (req, res, next) => {
    try {
        const isAdmin = req.user; // ข้อมูล user ที่ login / auth ส่งมาไห้
        const showuser = await User.findAll();
        res.json(showuser);
    } catch (error) {
        next(error);
    }
};

exports.banUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.update(
            { status: 0 },
            {
                where: {
                    id: id,
                },
            }
        );
        res.json({ message: "Ban user sussess" });
    } catch (error) {
        next(error);
    }
};

exports.unBanUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.update(
            { status: 1 },
            {
                where: {
                    id: id,
                },
            }
        );
        res.json({ message: "Unban user sussess" });
    } catch (error) {
        next(error);
    }
};
