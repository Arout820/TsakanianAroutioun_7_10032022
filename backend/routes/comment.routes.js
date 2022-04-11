const express = require('express');
const router = express.Router();
const commentController = require('../controllers/post.controller');
const auth = require('../middleware/auth');

// router.post('/', auth, commentController.createComment);
// router.get('/', auth, commentController.getAllComment);
// router.get('/:id', auth, commentController.getOneComment);
// router.put('/:id', auth, commentController.modifyComment);
// router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;
