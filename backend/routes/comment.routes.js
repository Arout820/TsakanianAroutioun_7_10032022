const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const auth = require('../middleware/auth');

router.post('/', auth, commentController.createComment);
router.get('/', auth, commentController.getAllComment);
router.get('/:id', auth, commentController.getOneComment);
router.delete('/:id', auth, commentController.deleteComment);
// router.put('/:id', auth, commentController.modifyComment);

module.exports = router;
