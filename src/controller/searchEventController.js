const { Event } = require("../models");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

exports.getSearch = async (req, res, next) => {
    try {
        const value = req.body;

        let whereOp = {};
        let whereOptitle = {};
        let whereDate = {};

        if (value.eventCategoryId) {
            whereOp.eventCategoryId = +value.eventCategoryId;
        }
        if (value.placeProvince) {
            whereOp.placeProvince = value.placeProvince;
        }
        if (value.dateStart) {
            whereDate.dateStart = value.dateStart;
        }
        if (value.dateEnd) {
            whereDate.dateEnd = value.dateEnd;
        }
        if (value.box) {
            whereOptitle.placeName = { [Op.like]: `%${value.box}%` };
        }
        if (value.box) {
            whereOptitle.title = { [Op.like]: `%${value.box}%` };
        }

        console.log("whereOp", whereOp);
        console.log("whereOptitle", whereOptitle);
        console.log("whereDate", whereOptitle);

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
