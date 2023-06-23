//// ###### MODEL  : USER #######/////

module.exports = (sequelize) => {
    const JoinEventUser = sequelize.define(
        "JoinEventUser",
        {},
        {
            underscored: true,
        }
    );

    JoinEventUser.associate = (models) => {
        JoinEventUser.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        JoinEventUser.belongsTo(models.Event, {
            foreignKey: {
                name: "eventId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    };

    return JoinEventUser;
};
