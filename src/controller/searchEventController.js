const { Event } = require("../models");
const { Op } = require("sequelize");

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
