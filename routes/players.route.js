const express = require('express');
const router = express.Router();
const PlayerController = require('../controllers/api/PlayerController');
const { selectCharacterValidator } = require('../validations/selectCharacterValidator');

router.get('/', PlayerController.index);
router.post('/select-character', (req, res, next) => {
    if( req.player.characters.length > 0) {
        let error = new Error('You\'ve already unlocked 3 default characters.');
        error.status = 400;
        next(error)
    }
    next();
}, selectCharacterValidator, PlayerController.selectCharacters);
router.get('/home', PlayerController.getHomeData);

module.exports = router;