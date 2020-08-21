const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send("Access Denied No Token Provided");
    }
    try {
        const decodedPayload = jwt.verify(token, process.env.privateKey);
        req.user = decodedPayload;
        next();

    } catch (err) {
        return res.status(400).send("Invalid Token");

    }

}

module.exports = auth;