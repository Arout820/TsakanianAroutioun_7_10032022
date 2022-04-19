const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const auth = require('../middleware/auth');

router.post('/', auth, commentController.createComment);
router.get('/', auth, commentController.getAllComment);
router.get('/:commentId', auth, commentController.getOneComment);
router.delete('/:commentId', auth, commentController.deleteComment);

module.exports = router;
