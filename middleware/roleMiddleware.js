const {verify} = require("jsonwebtoken");

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            if (!roles.includes(req.user.role)) throw new Error("incorrect role")

            next()
        } catch (e) {
            return res.status(400).json({message: e.message})
        }
    }
}