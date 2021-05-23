const { User } = require("../../models/Users/User");
const { refreshTokens } = require("../globalVariables");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const loginHandler = async function(req, res) {
    const { username, password } = req.body;
    const errorMsg = 'Username or password incorrect.';

    const user = await User.findOne({username: username}).exec();
    //if user does not exist, send error message
    if (!user) {
        console.log('failed at user does not exist');
        res.status(400).send(errorMsg);
    }

    else user.comparePassword(password, (err, isMatch) => {
        //if password does not match, send error message
        if (err || !isMatch) {
            console.log('failed at user password not match');
            res.status(400).send(errorMsg);
        }

        else {
            const userId = user._id;
            const accessToken = jwt.sign({ id: userId, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            const refreshToken = jwt.sign({ id: userId, username: user.username, role: user.role }, JWT_REFRESH_SECRET);

            refreshTokens.push(refreshToken);
            res.status(200).json({ userId, accessToken, refreshToken });
        }
    });
}

module.exports = { loginHandler };