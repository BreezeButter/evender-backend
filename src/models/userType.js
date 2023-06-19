//// ###### MODEL  : USER #######/////

module.exports = (sequelize, DataTypes) => {
    const UserType = sequelize.define(
        "UserType",
        {
            type: {
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

    UserType.associate = (models) => {
        UserType.hasMany(models.User, {
            foreignKey: {
                name: "userTypeId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    };

    return UserType;
};
