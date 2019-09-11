const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/comments_controller');

router.get('/', CommentsController.healthCheck);
router.post('/', CommentsController.create);

module.exports = router;
