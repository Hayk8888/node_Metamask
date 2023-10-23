const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator")
const {sign} = require('jsonwebtoken');
const {Web3} = require("web3");
const {bufferToHex} = require("ethereumjs-util");



class authController {
    async authentication(req, res) {

        try {

            const { address, signature, message } = req.body;

            let web3 = new Web3(Web3.givenProvider || "http://localhost:5001");
            const messageHash = web3.utils.soliditySha3(message);

            const recoveredAddress = bufferToHex(web3.eth.accounts.recover(messageHash, signature));
            console.log(recoveredAddress.toLowerCase())
            // console.log(address.toLowerCase())
            // console.log(messageHash);
            console.log(recoveredAddress)
            console.log(address)
            console.log(signature);
            if (recoveredAddress.toLowerCase() === address.toLowerCase()) {

                return res.json({ message: 'Authentication successful' });
            } else {

                return res.status(401).json({ message: 'Authentication failed' });
            }

            // The code below seems to be for user registration, not directly related to authentication.
            // You may want to refactor this part or place it in a separate route or controller.

            // const candidate = await User.findOne({$or: [{signature}, {message}]});
            // if (candidate) {
            //     return res.status(400).json({ message: 'Username or email already exists' });
            // }
            // const hashPassword = bcrypt.hashSync(password, 7);
            // const user = new User({ username, password: hashPassword, roles: 'USER', email });
            // await user.save();
            // return res.json({ message: 'User is connected' });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: `Authentication error: ${err.message}` });
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