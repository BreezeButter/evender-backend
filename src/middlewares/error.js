module.exports = (err, req, res, next) => {
    console.log("first");
    console.log(err);
    res.status(500).json({ message: err.message });
};
