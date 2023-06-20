const { Event, JoinEventUser, User } = require("../models");

exports.getAllEvents = async (req, res, next) => {
    try {
        const events = await Event.findAll({
            include: { model: JoinEventUser, include: User },
        });
        // console.log(result);
        res.status(200).json({ events });
    } catch (err) {
        next(err);
    }
};

exports.createEvent = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
};
