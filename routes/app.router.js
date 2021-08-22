const router = require('express').Router();

const { appController } = require('../controllers');

router.get('/', appController.getStartPage);

module.exports = router;
