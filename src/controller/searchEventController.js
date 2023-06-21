const { Event, JoinEventUser,User } = require("../models");

exports.getEventByCategory = async (req, res, next) => {
    try {
        const { input } = req.params;
        console.log("----->", input);
        if (input == 1) {
            const event = await Event.findAll({include:{ model: JoinEventUser,
                include: User}} 
            );
            res.status(200).json(event);
        } else {
            const event = await Event.findAll({
                where: { eventCategoryId: input },
                include: [{ model: JoinEventUser, include: User }],
            });
            res.status(200).json(event);
        }
    } catch (err) {
        next(err);
    }
};






