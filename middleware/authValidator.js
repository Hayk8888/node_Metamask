const {check } = require("express-validator");

module.exports = [
    check('username').isLength({min: 4}).withMessage('username must be at least 4 characters length')
        .custom((value) => {
            if(value.charAt(0) === value.charAt(0).toUpperCase()){
                return true
            }else{
                throw new Error('Username must start  with a capitalize')
            }
        }),
    check('email').isEmail().withMessage('Email is invalid  or incurrect'),
    check('password').isLength({min: 6}).withMessage('Password  must be at least 8 characters length'),
]