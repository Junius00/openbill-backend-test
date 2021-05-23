const userById = async function(req, res) {
    res.send(200).json({ user: req.mUser.toJSON() });
}

module.exports = { userById };