const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const password = require('../middleware/password.validation');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', password, userController.signup);
router.post('/login', userController.login);
router.get('/', userController.getAllUser);
router.get('/:id', auth, userController.getOneUser);
router.put('/:id', auth, multer, userController.modifyUser);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;
