const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users_controller');
const auth = require('../middleware/auth');
const oid = require('../middleware/oid');

router.post('/', UsersController.createOneUser);
router.get('/', UsersController.readManyUsers);
router.get('/:id', oid, auth, UsersController.readOneUser);
router.put('/:id', oid, auth, UsersController.updateOneUser);
router.delete('/:id', oid, auth, UsersController.deleteOneUser);

module.exports = router;
