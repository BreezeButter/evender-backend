//// ###### MODEL  : USER #######/////

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
            status: {
                type: DataTypes.STRING,
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
    };

    return Transection;
};
