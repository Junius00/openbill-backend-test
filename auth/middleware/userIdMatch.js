const { User } = require('../../models/Users/User');

const userIdCheckHandler = async function(req, res, next) {
    //get JWT details
    const { id, username, role } = req.user;
    const userId = req.params.userId;

    //attempt to find user on MongoDB
    const mUser = await User.findById(userId).exec();

    //return if user cannot be found
    if (!mUser) return res.sendStatus(403);
    //return if user does not match requestor ID unless admin
    if (mUser._id !== id && role == 'user') return res.sendStatus(403);

    //attach mongoDB user object to req
    req.mUser = mUser;
    next();
}
module.exports = { userIdCheckHandler };