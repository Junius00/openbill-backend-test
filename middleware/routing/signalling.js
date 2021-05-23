const signalNext = function (req, res, next) {
    req.signalNext = true;
    next();
}

module.exports = { signalNext };