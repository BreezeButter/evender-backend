const { Event, sequelize, JoinEventUser, User } = require("../models");
const { Op } = require("sequelize");

exports.palaceProvince = async (req, res, next) => {
    try {
        const placeOutput = await Event.findAll({
            attributes: ["placeProvince"],
            distinct: "placeProvince",
        });

        const distinctOutput = placeOutput.filter(
            (v, i, a) =>
                a.map((e) => e["placeProvince"]).indexOf(v["placeProvince"]) ===
                i
        );

        res.status(200).json(distinctOutput);
    } catch (err) {
        next(err);
    }
};

exports.getSearch = async (req, res, next) => {
    try {
        const value = req.body;

        let whereOp = {};
        let whereOptitle = {};
        let whereCondition = {};
        let whereLocation = {};

        if (value.eventCategoryId) {
            whereOp.eventCategoryId = +value.eventCategoryId;
        }
        if (value.placeProvince) {
            whereOp.placeProvince = value.placeProvince;
        }
        if (value.dateStart) {
            whereCondition.date_start = {
                [Op.gte]: new Date(value.dateStart),
            };
        }
        if (value.dateEnd) {
            whereCondition.date_end = {
                [Op.lte]: new Date(value.dateEnd),
            };
        }
        if (value.box) {
            whereOptitle = {
                [Op.or]: [
                    { placeName: { [Op.like]: `%${value.box}%` } },
                    { title: { [Op.like]: `%${value.box}%` } },
                ],
            };
        }
        if (value.latitude && value.longitude && value.radi) {
            whereLocation = {
                latitude: value.latitude,
                longitude: value.longitude,
                radi: value.radi,
            };
        }

        const whereQuery = {
            ...whereOp,
            ...whereOptitle,
            ...whereCondition,
        };

        if (Object.keys(whereLocation).length === 0) {
            const searchOutput = await Event.findAll({
                include: { model: JoinEventUser, include: User },
                where: whereQuery,
                order: [["isBoost", "DESC"]],
            });

            res.status(200).json(searchOutput);
        } else {
            try {
                const haversine = `(6371 * acos(cos(radians(${whereLocation.latitude})) * 
            cos(radians(latitude)) * cos(radians(longitude) - radians(${whereLocation.longitude})) +
            sin(radians(${whereLocation.latitude})) * sin(radians(latitude))))`;

                const locations = await Event.findAll({
                    attributes: ["id", "latitude", "longitude"],
                    where: sequelize.where(
                        sequelize.literal(haversine),
                        "<=",
                        whereLocation.radi
                    ),
                });

                const eventIds = locations.map((el) => el.id);

                const searchOutput = await Event.findAll({
                    include: { model: JoinEventUser, include: User },
                    where: {
                        ...whereQuery,
                        id: { [Op.in]: eventIds },
                    },
                    order: [["isBoost", "DESC"]],
                });

                res.status(200).json(searchOutput);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        }
    } catch (err) {
        next(err);
    }
};
