const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users_controller');
const oid = require('../middleware/oid');

router.post('/', UsersController.createOneUser);
router.get('/', UsersController.readManyUsers);
router.get('/:id', oid, UsersController.readOneUser);
router.put('/:id', oid, UsersController.updateOneUser);
router.delete('/:id', oid, UsersController.deleteOneUser);

module.exports = router;
