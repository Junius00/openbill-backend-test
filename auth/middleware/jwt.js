const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const jwtHandler = function(req, res, next) {
    const authHeader = req.headers.authorization;

    //no token; revoke access
    if (!authHeader) res.sendStatus(401);
    else {
        //in the format 'Bearer [JWT_TOKEN]'
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);

            //all clear; attach user to req and proceed
            else {
                req.user = user;
                next();
            }
        })
    }
}

module.exports = { jwtHandler };