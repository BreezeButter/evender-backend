const Joi = require("joi");

const registerSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email({ tlds: false }).required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{6,30}$/)
        .trim()
        .required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .trim()
        .required()
        .strip()
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

exports.validateRegister = (input) => {
    const { value, error } = registerSchema.validate(input);
    if (error) {
        throw error;
    }
    return value;
};

exports.validateLogin = (input) => {
    const { value, error } = loginSchema.validate(input);
    if (error) {
        throw error;
    }
    return value;
};
