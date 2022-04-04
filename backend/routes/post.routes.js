const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const auth = require('../middleware/auth');

router.post('/', auth, postController.createPost);
router.get('/', auth, postController.getAllPost);
router.get('/:id', auth, postController.getOnePost);
router.put('/:id', auth, postController.modifyPost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;
