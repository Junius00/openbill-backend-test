const { refreshTokens } = require("../globalVariables");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const refreshTokenHandler = function(req, res) {
    const { token } = req.body;
    
    //no token; don't grant access to new token
    if (!token) {
        return res.status(400).send('Please provide a refresh token.');
    }

    //refresh token not in current server; don't grant access
    if (!refreshTokens.includes(token)) {
        return res.status(403).send('Invalid refresh token.');
    }

    jwt.verify(token, JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.status(503).send(err);
        }
        else {
            const accessToken = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

            res.json({ accessToken });
        }
    });
}

module.exports = { refreshTokenHandler };