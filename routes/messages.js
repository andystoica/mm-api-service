const express = require('express');
const router = express.Router();
const MessagesController = require('../controllers/messages_controller');
const oid = require('../middleware/oid');

router.post('/', MessagesController.createOneMessage);
router.get('/', MessagesController.readManyMessages);
router.get('/:id', oid, MessagesController.readOneMessage);
router.put('/:id', oid, MessagesController.updateOneMessage);
router.delete('/:id', oid, MessagesController.deleteOneMessage);

module.exports = router;
