const express = require('express');
const router = express.Router();
const MessagesController = require('../controllers/messages_controller');

router.get('/', MessagesController.healthCheck);
router.post('/', MessagesController.create);

module.exports = router;
