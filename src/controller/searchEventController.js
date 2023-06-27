const { Event } = require("../models");
const { Op } = require("sequelize");

const Sequelize = require("sequelize");

exports.getSearch = async (req, res, next) => {
    try {
        const value = req.body;

        let whereOp = {};
        let whereOptitle = {};
        let whereCondition = {};

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

        const whereQuery = {
            ...whereOp,
            ...whereOptitle,
            ...whereCondition,
        };

        const searchOutput = await Event.findAll({
            where: whereQuery,
        });

        res.status(200).json(searchOutput);
    } catch (err) {
        next(err);
    }
};

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

exports.getNearby = async (req, res, next) => {
    try {
        const { latitude, longitude, radi } = req.body;

        let radius = radi;
        const haversine = `(6371 * acos(cos(radians(${latitude})) * 
    cos(radians(latitude)) * cos(radians(longitude) - radians(${longitude})) +
    sin(radians(${latitude})) * sin(radians(latitude))))`;

        try {
            const locations = await Event.findAll({
                attributes: ["id", "latitude", "longitude"],
                where: Sequelize.where(
                    Sequelize.literal(haversine),
                    "<=",
                    radius
                ),
            });

            const modify = JSON.parse(JSON.stringify(locations));
            const eventIds = modify.map((el) => el.id);

            const result = await Event.findAll({
                where: {
                    id: {
                        [Op.in]: eventIds,
                    },
                },
            });

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Bad request" });
    }
};
