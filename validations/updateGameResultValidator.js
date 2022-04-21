const { body, check } = require('express-validator');
const req = require('express/lib/request');
const res = require('express/lib/response');
const Character = require('../models/character');
const Player = require('../models/player');
const findDuplicate = require('../utils/');

exports.updateGameResultValidator = [
    body('gameMode', 'gameMode was missing.').exists().trim().isIn(['3v3','5v5']),
    body('tieBreaker', 'tie_breaker was missing.').exists().trim().isIn(['golden_goal','penalty']),
    body('privacy', 'privacy was missing.').exists().trim().isIn(['public','privacy']),
    body('resultSet').exists().withMessage('resultSet was missing').isArray().custom((resultSet, {req, location, path}) => {
        if(req.body.gameMode == '3v3') {
            return resultSet.length === 3
        }
        if(req.body.gameMode == '5v5') {
            return resultSet.length === 5
        }
    }),
    body('resultSet.*', 'result_set item was not valid.').matches(/^(\d+)-(\d+)$/i),
    body('playerIdList').exists().withMessage('playerIdList was missing.').isArray().custom((playerIdList, { req, location, path }) => {
        if (req.body.gameMode == '3v3') {
            return playerIdList.length === 6
        }
        if (req.body.gameMode == '5v5') {
            return playerIdList.length === 10
        }
    }),
    body('playerIdList.*').isMongoId().withMessage('playerID is not valid MongoId.').custom(async (playerId, { req, location, path }) => {
        let playerIdList = req.body.playerIdList;
        let count = 0;
        playerIdList.forEach( item => {
            if(item === playerId) count++;
        });
        if(count > 1) {
            return Promise.reject(`playerID ${playerId} is duplicate!`);
        }

        let player = await Player.findOne({ _id: playerId, playerStatus: 'active' }, { _id: 1 });
        if (! player) return Promise.reject('player id is not in DB.');
    }),
    body('goalScoredList').custom((goalScoredList, { req, location, path}) => {
        if (req.body.gameMode == '3v3') {
            return goalScoredList.length === 6
        }
        if (req.body.gameMode == '5v5') {
            return goalScoredList.length === 10
        }
    }),
    body('goalScoredList.*').toInt().isInt({ min: 0 }),
    body('characterIdList').custom((characterIdList, { req, location, path}) => {
        if (req.body.gameMode == '3v3') {
            return characterIdList.length === 6
        }
        if (req.body.gameMode == '5v5') {
            return characterIdList.length === 10
        }
    }),
    body('characterIdList.*').isArray({ min: 3, max: 3 }).custom(async (characterIdList, { req, location, path }) => {
        let duplicateItem = findDuplicate(characterIdList);
        if (duplicateItem.length > 0) {
            return Promise.reject('characterId: ' + duplicateItem.join(',') + ` is duplicate.`);
        }
    }),
    body('characterIdList.*.*').isMongoId().withMessage('characterId is not valid MongoId.')
        .custom(async (characterId, { req, location, path }) => {
        let character = await Character.findOne({ _id: characterId }, { _id: 1 });
        if (! character) return Promise.reject('character id: ' + characterId + ' is not in DB.');
    }),
    body('startedAt').exists().matches(/Z$/),
    body('finishedAt').exists().matches(/Z$/),

    (req, res, next) => {
        let rs = req.validateRequest();
        if(rs === true) next();
    },
];

//**Notes*/
//(1): https://stackoverflow.com/a/46013025/11297747