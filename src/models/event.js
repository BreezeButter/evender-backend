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
            placeName: {
                type: DataTypes.STRING,
            },
            placeProvince: {
                type: DataTypes.STRING,
            },
            placeCountry: {
                type: DataTypes.STRING,
            },
            latitude: {
                type: DataTypes.DECIMAL(16, 10),
            },
            longitude: {
                type: DataTypes.DECIMAL(16, 10),
            },
            placeId: {
                type: DataTypes.STRING,
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
                max: 50,
                len: [1, 30],
                validate: {
                    notEmpty: true,
                },
            },
            productDefaultPrice: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            paymentLinkUrl: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            isBoost: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
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
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
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