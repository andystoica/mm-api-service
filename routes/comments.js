const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/comments_controller');
const oid = require('../middleware/oid');

router.post('/', CommentsController.createOneComment);
router.get('/', CommentsController.readManyComments);
router.get('/:id', oid, CommentsController.readOneComment);
router.put('/:id', oid, CommentsController.updateOneComment);
router.delete('/:id', oid, CommentsController.deleteOneComment);

module.exports = router;
