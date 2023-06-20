const { User } = require("../models");
const createError = require("../utils/createError");
const {
    validateRegister,
    // validateLogin
} = require("../validators/auth-validator");
const bcryptService = require("../services/bcrypt-service");
const tokenService = require("../services/token-service");

exports.register = async (req, res, next) => {
    try {
        const value = validateRegister(req.body);
        let checkIfEmailExist = await User.findOne({
            where: {
                email: value.email
            }
        });

        if (checkIfEmailExist) {
            createError("email is already exist", 400);
        }
        value.password = await bcryptService.hash(value.password);
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
        const user = await User.findOne({
            where: {
                email: value.email
            }
        });
        if (!user) {
            createError("Invalid Credential", 400);
        }
        const isPasswordCorrect = bcryptService.compare(
            value.password,
            user.password
        );
        if (!isPasswordCorrect) {
            createError("invalid credential", 400);
        }
        const accessToken = tokenService.sign({ id: user.id });
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
