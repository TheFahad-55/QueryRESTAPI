function isAdmin(req, res, next) {
    //we gonn have req.user
    if (!req.user.isAdmin) {
        return res.status(403).send('Forbidden');
    }
    next();








}

module.exports = isAdmin;