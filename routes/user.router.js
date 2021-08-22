const router = require('express').Router();

const { userController } = require('../controllers');

router.get('/', userController.getAllUsers);
router.get('/:user_id', userController.getUserById);
router.post('/', userController.postAllUsers);

module.exports = router;
