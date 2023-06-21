const bcrypt = require("bcryptjs");

exports.hash = (password) => (bcrypt.hash(password, 12));


exports.compare = (password, hashedPassword) =>
    bcrypt.compare(password, hashedPassword);
