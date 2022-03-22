const express = require('express');
const router = express.Router();
const PlayerController = require('../controllers/api/PlayerController');
const { selectCharacterValidator } = require('../validations/selectCharacterValidator');

router.get('/', PlayerController.index);
router.post('/select-character', selectCharacterValidator, PlayerController.selectCharacters);
router.get('/home', PlayerController.getHomeData);

module.exports = router;