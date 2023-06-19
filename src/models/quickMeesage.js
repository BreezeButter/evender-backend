//// ###### MODEL  : USER #######/////

module.exports = (sequelize, DataTypes) => {
    const QuickMessage = sequelize.define("QuickMessage", {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    QuickMessage.associate = (models) => {
        QuickMessage.hasMany(models.Chat, {
            foreignKey: {
                name: "QuickMessageId",
                
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    };

    return QuickMessage;
};
