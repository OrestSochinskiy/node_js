const router = require('express').Router();

const { registerController } = require('../controllers');

router.get('/', registerController.getRegister);

module.exports = router;
