const { modifyRefreshTokens, refreshTokens } = require("../globalVariables");

const logoutHandler = function(req, res) {
    const { token } = req.body;
    if (!token) {
        return res.status(400).send('Please send in a refresh token.');
    }
    //modify global refresh tokens
    modifyRefreshTokens(refreshTokens.filter(t => t !== token));

    //failed to log out for some reason
    if (refreshTokens.includes(token)) {
        return res.status(503).send('Server failed to remove token. Please try again.');
    }

    const loggedOut = true;
    res.json({ loggedOut });
}

module.exports = { logoutHandler };