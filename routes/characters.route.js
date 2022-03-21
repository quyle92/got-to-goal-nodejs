const express = require('express');
const router = express.Router();
const CharacterController = require('../controllers/api/CharacterController');

router.get('/', CharacterController.index);

module.exports = router;
