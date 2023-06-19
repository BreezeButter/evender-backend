//// ###### MODEL  : USER #######/////

module.exports = (sequelize, DataTypes) => {
    const EventReview = sequelize.define("EventReview", {
        rating: {
            type: DataTypes.INTEGER,
        },
    });

    EventReview.associate = (models) => {
        EventReview.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        EventReview.belongsTo(models.Event, {
            foreignKey: {
                name: "eventId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    };

    return EventReview;
};
