module.exports = (sequelize, DataTypes) => {
    const Transection = sequelize.define(
        "Transection",
        {
            stripOrderNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            underscored: true,
        }
    );

    Transection.associate = (models) => {
        Transection.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        });
        Transection.belongsTo(models.Event, {
            foreignKey: {
                name: "eventId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        });
    };

    return Transection;
};
