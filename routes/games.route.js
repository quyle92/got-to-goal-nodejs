const express = require('express');
const router = express.Router();
const GameController = require('../controllers/api/GameController');
const { updateGameResultValidator } = require('../validations/updateGameResultValidator');

router.post('/',  updateGameResultValidator, GameController.updateGameResult);

module.exports = router;