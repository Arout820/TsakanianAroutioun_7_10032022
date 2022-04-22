const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likes.controller');
const auth = require('../middleware/auth');

router.post('/', auth, likesController.createLikes);
router.delete('/:userId/:postId/:isLiked', auth, likesController.deleteLikes);
router.get('/:userId/:postId', auth, likesController.getLikesFromUser);

module.exports = router;
