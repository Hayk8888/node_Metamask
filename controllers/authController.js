const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator")
const {sign} = require('jsonwebtoken');

class authController {
    async registration(req, res) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send(`validation is not  successful`);
        }

        try {
            const {username, password, email} = req.body
            const candidate = await User.findOne({$or: [{username}, {email}]});
            if (candidate) {
                return res.status(400).json({message: "username or email in this  name or username is  verified"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashPassword, roles: "USER", email: email,});
            await user.save()
            return res.json({message: "user is connected"});
        } catch (err) {
            console.log(err)
            res.status(400).json({message: "Registration error"})
        }
    }

    async login(req, res) {

        if (!validationResult) {
            return res.status(400).json({message: `validation error`})
        }

        try {
            const {email, username, password} = req.body
            const user = await User.findOne({$and: [{username}, {email}]})
            if (!user) {
                return res.status(400).json({message: `user is ${username} is not  found`})
            }

            const {password: hashed, ...userData} = JSON.parse(JSON.stringify(user))

            if (!bcrypt.compareSync(password, hashed)) {
                return res.status(200).json({message: 'password is  incurrent'})
            }

            const secretKey = "helloworld123"
            const token = await sign(userData, secretKey, {expiresIn: '30d'});
            res.status(201).json({token})
        } catch (err) {
            console.error(err);
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUser(req, res) {
        try {
            const users = await User.find()

            res.json({users: users})
        } catch (err) {
            console.error(err)
        }
    }

}

module.exports = new authController()