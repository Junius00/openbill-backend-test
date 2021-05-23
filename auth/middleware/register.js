const { User } = require("../../models/Users/User");
const { refreshTokens } = require("../globalVariables");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const registerHandler = async function(req, res) {
    const { email, username, password } = req.body;
    //check if email exists
    const userCheck = await User.findOne({ email: email }).exec();
    if (userCheck) {
        res.status(400).send('E-mail is in use. Try another one.');
    }
    else {
        const newUser = new User({
            email: email,
            username: username,
            password: password,
            role: 'user'
        });

        newUser.save((err) => {
            if (err) {
                res.status(503).send(err);
            }
            else {
                const userId = newUser._id;
                const accessToken = jwt.sign({ id: newUser._id, username: newUser.username, role: newUser.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
                const refreshToken = jwt.sign({ id: newUser._id, username: newUser.username, role: newUser.role }, JWT_REFRESH_SECRET);

                refreshTokens.push(refreshToken);
                res.status(200).json({ userId, accessToken, refreshToken });
            }
        });

    }
};

module.exports = { registerHandler };