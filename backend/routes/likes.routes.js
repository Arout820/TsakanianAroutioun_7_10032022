const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likes.controller');
const auth = require('../middleware/auth');

router.post('/', auth, likesController.createLikes);
router.delete('/:likesId', auth, likesController.deleteLikes);
// router.get('/', auth, likesController.getLikes);

module.exports = router;
