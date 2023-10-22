const express = require("express");
const router =  express.Router();
const controller =  require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/registration',);
router.get('/login',);
router.get('/admin', authMiddleware, roleMiddleware(["ADMIN"]), controller.getUser);
router.post('/registration', controller.registration)
router.post('/login', controller.login);

module.exports = router
