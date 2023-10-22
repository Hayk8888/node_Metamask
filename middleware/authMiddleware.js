const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        if (!req.headers.authorization) {
            return res.status(403).json({message: 'auth header is required'})
        }
        const tokens = req.headers.authorization.split(' ')[1]
        if (!tokens) {
            return res.status(403).json({message: 'user is  not  authorized'})
        }
        req.user = jwt.verify(tokens, process.env.SECRETKEY);
        next()
    } catch (err) {
        console.log(err);
        return res.status(400).json({message: "user is  not  authorized"});
    }
}