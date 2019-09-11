const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users_controller');

router.post('/', UsersController.createUser);
router.get('/', UsersController.readUsers);
router.get('/:id', UsersController.readUser);
router.put('/:id', UsersController.updateUser);
router.delete('/:id', UsersController.deleteUser);

module.exports = router;
