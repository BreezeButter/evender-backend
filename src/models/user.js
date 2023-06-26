//// ###### MODEL  : USER #######/////

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            userName: {
                type: DataTypes.STRING,
            },

            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                isEmail: true,
                validate: {
                    notEmpty: true,
                },
            },
            password: {
                type: DataTypes.STRING,
            },
            gender: {
                type: DataTypes.ENUM(
                    "Male",
                    "Female",
                    "Other",
                    "Not Specified"
                ),
            },
            bdate: {
                type: DataTypes.DATEONLY,
            },
            image: {
                defaultValue:
                    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
                type: DataTypes.STRING,
            },
            coin: {
                defaultValue: 0,
                type: DataTypes.INTEGER,
            },
            aboutMe: DataTypes.STRING,
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            underscored: true,
        }
    );

    User.associate = (models) => {
        User.belongsTo(models.UserType, {
            foreignKey: {
                name: "userTypeId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });

        User.hasMany(models.Event, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });

        User.hasMany(models.JoinEventUser, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        User.hasMany(models.EventReview, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });

        User.hasMany(models.Transection, {
            foreignKey: {
                name: "userId",
                allowNull: false,
                defaultValue: 1,
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        });

        User.hasMany(models.Chat, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    };

    return User;
};
