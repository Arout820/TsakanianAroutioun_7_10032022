const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, postController.createPost);
router.get('/comments/:postId', auth, postController.getCommentsFromPost);
router.get('/', auth, postController.getAllPost);
router.get('/:postId', auth, postController.getOnePost);
router.put('/:postId', auth, postController.modifyPost);
router.delete('/:postId', auth, postController.deletePost);

module.exports = router;
