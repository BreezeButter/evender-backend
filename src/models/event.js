//// ###### MODEL  : USER #######/////

module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define(
        "Event",
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },

            description: {
                type: DataTypes.STRING,
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            latitude: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            longitude: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            dateStart: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            dateEnd: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            capacity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            image1: {
                type: DataTypes.STRING,
            },
            image2: {
                type: DataTypes.STRING,
            },
            image3: {
                type: DataTypes.STRING,
            },
        },
        {
            underscored: true,
        }
    );

    Event.associate = (models) => {
        Event.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });

        Event.belongsTo(models.EventCategory, {
            foreignKey: {
                name: "eventCategoryId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });

        Event.hasMany(models.JoinEventUser, {
            foreignKey: {
                name: "eventId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        Event.hasMany(models.EventReview, {
            foreignKey: {
                name: "eventId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        Event.hasMany(models.Chat, {
            foreignKey: {
                name: "eventId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    };

    return Event;
};
