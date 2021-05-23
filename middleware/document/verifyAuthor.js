const verifyAuthor = function(req, res, next) {
    if (req.user.id != req.document.author && req.user.role == 'user') {
        res.status(403).send('Forbidden');
        return;
    }

    next();
}

module.exports = { verifyAuthor };