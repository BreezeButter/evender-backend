//// ###### MODEL  : USER #######/////

module.exports = (sequelize, DataTypes) => {
    const EventCategory = sequelize.define(
        "EventCategory",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            emoji: {
                type: DataTypes.STRING,
            },
        },
        {
            underscored: true,
        }
    );
    EventCategory.associate = (models) => {
        EventCategory.hasMany(models.Event, {
            foreignKey: {
                name: "eventCategoryId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    };

    return EventCategory;
};
