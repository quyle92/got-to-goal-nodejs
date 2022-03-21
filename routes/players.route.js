const express = require('express');
const router = express.Router();
const PlayerController = require('../controllers/api/PlayerController');

router.get('/', PlayerController.index);

module.exports = router;