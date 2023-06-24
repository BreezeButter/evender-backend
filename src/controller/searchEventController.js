const { Event } = require("../models");
const { Op } = require("sequelize");

exports.getSearch = async (req, res, next) => {
    try {
        const value = req.body;

        let whereOp = {};

        if (value.eventCategoryId) {
            whereOp.eventCategoryId = +value.eventCategoryId;
        }
        if (value.dateStart) {
            whereOp.dateStart = value.dateStart;
        }
        if (value.dateEnd) {
            whereOp.dateEnd = value.dateEnd;
        }
        if (value.title) {
            whereOp.title = { [Op.like]: `%${value.title}%` }; // Allows for partial matching on title
        }
        if (value.placeName) {
            whereOp.placeName = { [Op.like]: `%${value.placeName}%` }; // Allows for partial matching on title
        }
        if (value.placeProvince) {
            whereOp.placeProvince = value.placeProvince;
        }

        const searchOutput = await Event.findAll({
            where: whereOp,
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
