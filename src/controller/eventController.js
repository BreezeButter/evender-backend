const { Event } = require("../models");
exports.getAllEvents = async (req, res, next) => {
    try {
        const events = await Event.findAll();
        // console.log(result);
        res.status(200).json({ events });
    } catch (err) {
        next(err);
    }
};
