const { Event, EventCategory } = require("../models");

exports.getEventByCategory = async (req, res, next) => {
    try {
        const { input } = req.params;
        if (input == "all") {
            const event = await Event.findAll();
            res.status(200).json(event);
        } else {
            const event = await EventCategory.findAll({
                where: { name: input },
                include: [{ model: Event }],
            });
            res.status(200).json(event);
        }
    } catch (err) {
        next(err);
    }
};
