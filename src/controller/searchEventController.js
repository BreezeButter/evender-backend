const { Event, EventCategory } = require("../models");

exports.getEventByCategory = async (req, res, next) => {
    try {
        const { input } = req.params;
        console.log("--->", input);
        const event = await EventCategory.findAll({
            where: { name: input },
            include: [{ model: Event }],
        });
        res.json(event);
    } catch (err) {
        next(err);
    }
};
