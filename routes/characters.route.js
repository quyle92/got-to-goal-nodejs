const express = require('express');
const router = express.Router();
const CharacterController = require('../controllers/api/CharacterController');

router.get('/', CharacterController.index);
router.get('/character-selection-stats', CharacterController.getCharacterSelectionStats);

module.exports = router;
