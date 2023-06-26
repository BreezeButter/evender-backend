const { User } = require("../models");
const createError = require("../utils/createError");
const {
    validateRegister,
    validateLogin,
} = require("../validators/auth-validator");
const bcryptService = require("../services/bcrypt-service");
const tokenService = require("../services/token-service");

exports.register = async (req, res, next) => {
    try {
        const value = validateRegister(req.body);
        let checkIfEmailExist = await User.findOne({
            where: {
                email: value.email.toLowerCase(),
            },
        });

        if (checkIfEmailExist) {
            createError("email is already exist", 400);
        }
        value.password = await bcryptService.hash(value.password);
<<<<<<< HEAD
        value.email.toLowerCase();
=======
        value.email.toLowerCase;
>>>>>>> 018f79c3c24247357257db1e2d57a6c467a0b04a
        const user = await User.create(value);
        const accessToken = tokenService.sign({ id: user.id });
        res.status(200).json({ accessToken });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const value = validateLogin(req.body);
        // console.log(value,"value")
        const user = await User.findOne({
            where: {
<<<<<<< HEAD
                email: value.email.toLowerCase(),
=======
                email: value.email,
>>>>>>> 018f79c3c24247357257db1e2d57a6c467a0b04a
            },
        });
        if (!user) {
            createError("Invalid Credential", 400);
        }

        console.log("-->", user);
        const isPasswordCorrect = await bcryptService.compare(
            value.password,
            user.password
        );

        console.log("---->", isPasswordCorrect);

        if (!isPasswordCorrect) {
            createError("invalid credential", 400);
        }
        const accessToken = tokenService.sign({ id: user.id });
        res.status(200).json({ accessToken });
    } catch (err) {
        next(err);
    }
};

exports.logingoogle = async (req, res, next) => {
    try {
        const value = req.body;
        console.log("value---------->", value);
        const user = await User.findOne({
            where: {
                email: value.email.toLowerCase(),
            },
        });
        let userGoogle;
        if (!user) {
            userGoogle = await User.create(value);
            console.log("(userGoogle", userGoogle);
        }

        const accessToken = tokenService.sign({
            id: userGoogle ? userGoogle.id : user.id,
        });
        res.status(200).json({ accessToken });
    } catch (err) {
        next(err);
    }
};

exports.getMe = (req, res, next) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (err) {
        next(err);
    }
};
