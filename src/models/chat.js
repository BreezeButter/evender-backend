module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define(
        "Chat",
        {
            massage: {
                type: DataTypes.STRING,
            },
            image: {
                type: DataTypes.STRING,
            },
            sticker: {
                type: DataTypes.STRING,
            },
        },
        {
            underscored: true,
        }
    );

    Chat.associate = (models) => {
        Chat.belongsTo(models.QuickMessage, {
            foreignKey: {
                name: "QuickMessageId",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        Chat.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        Chat.belongsTo(models.Event, {
            foreignKey: {
                name: "eventId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    };

    return Chat;
};
