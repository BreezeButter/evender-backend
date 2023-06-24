const { Event } = require("../models");
const { Op } = require("sequelize");

exports.getSearch = async (req, res, next) => {
    try {
        const value = req.body;

        let whereOp = {};
        let whereOptitle = {};

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
        if (value.box) {
            whereOp.placeName = { [Op.like]: `%${value.box}%` }; // Allows for partial matching on title
        }
        if (value.box) {
            whereOptitle.title = { [Op.like]: `%${value.box}%` }; // Allows for partial matching on title
        }
        if (value.placeProvince) {
            whereOp.placeProvince = value.placeProvince;
        }
        console.log("whereOp", whereOp);
        console.log("whereOptitle", whereOptitle);
        const searchOutput = await Event.findAll({
            where: whereOp,
            [Op.or]: whereOptitle,
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
