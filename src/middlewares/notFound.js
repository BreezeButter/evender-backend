module.exports = (req, res) => {
    res.status(404).json({ message: "resource is not found" });
};
