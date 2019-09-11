const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/comments_controller');

router.post('/', CommentsController.createComment);
router.get('/', CommentsController.readComments);
router.get('/:id', CommentsController.readComment);
router.put('/:id', CommentsController.updateComment);
router.delete('/:id', CommentsController.deleteComment);

module.exports = router;
