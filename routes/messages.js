const express = require('express');
const router = express.Router();
const MessagesController = require('../controllers/messages_controller');

router.post('/', MessagesController.createMessage);
router.get('/', MessagesController.readMessages);
router.get('/:id', MessagesController.readMessage);
router.put('/:id', MessagesController.updateMessage);
router.delete('/:id', MessagesController.deleteMessage);

module.exports = router;
