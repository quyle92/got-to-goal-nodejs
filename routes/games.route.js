const express = require('express');
const router = express.Router();
const GameController = require('../controllers/api/GameController');
const { selectCharacterValidator } = require('../validations/selectCharacterValidator');

router.get('/', GameController.index);

module.exports = router;