const Player = require('../../models/player');
const Costume = require('../../models/costume');
const res = require('express/lib/response');
const GameService = require('../../services/api/GameService');
class GameController {
    updateGameResult(req, res, next) {
        return res.json('ok');
    }
}

module.exports = new GameController;