const { JoinEventUser, User, Event } = require("../models");

exports.getDetailUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(req.params);
        const event = await Event.findOne({
            where: { id: id },
            include: { model: JoinEventUser, include: User },
        });
        res.status(200).json(event);
    } catch (err) {
        next(err);
    }
};
exports.getUserHostEventById = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(req.params);
        const event = await Event.findOne({
            where: { id: id },
            include: { model: User },
        });
        res.status(200).json(event);
    } catch (err) {
        next(err);
    }
};
