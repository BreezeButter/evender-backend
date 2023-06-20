const { Event } = require("../models");
exports.getAllEvents = async (req, res, next) => {
    try {
        const result = await Event.findAll();
        console.log(result);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
