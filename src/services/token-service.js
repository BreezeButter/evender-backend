const jwt = require("jsonwebtoken");

exports.sign = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_IN
    });

exports.verify = (token) => jwt.verify(token, process.env.JWT_SECRET_KEY); //return payload
