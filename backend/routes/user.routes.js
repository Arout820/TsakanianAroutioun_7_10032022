const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const password = require('../middleware/password.validation');

router.post('/signup', password, userController.signup);
router.post('/login', userController.login);

module.exports = router;
