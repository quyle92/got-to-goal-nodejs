const { body, check } = require('express-validator');
const req = require('express/lib/request');
const res = require('express/lib/response');
const Character = require('../models/character');
const Player = require('../models/player');

exports.updateGameResultValidator = [
    body('game_mode', 'game_mode was missing.').exists().trim().isIn(['3v3','5v5']),
    body('tie_breaker', 'tie_breaker was missing.').exists().trim().isIn(['golden_goal','penalty']),
    body('privacy', 'privacy was missing.').exists().trim().isIn(['public','privacy']),
    body('result_set', 'result_set was missing.').exists().isArray().custom((result_set, {req, location, path}) => {
        if(req.body.game_mode == '3v3') {
            return result_set.length === 3
        }
        if(req.body.game_mode == '5v5') {
            return result_set.length === 5
        }
    }),
    body('result_set.*', 'result_set item was not valid.').matches(/^(\d+)-(\d+)$/i),
    body('player_sn_list', 'player_sn_list was missing.').exists().isArray().custom((result_set, { req, location, path }) => {
        if (req.body.game_mode == '3v3') {
            return result_set.length === 6
        }
        if (req.body.game_mode == '5v5') {
            return result_set.length === 10
        }
    }),
    body('player_sn_list.*').isMongoId().withMessage('player_sn is not valid MongoId.').custom(async (player_sn, { req, location, path }) => {
        let player_sn_list = req.body.player_sn_list;
        let count = 0;
        player_sn_list.forEach( item => {
            if(item === player_sn) count++;
        });
        if(count > 1) {
            return Promise.reject(`player_sn ${player_sn} is duplicate!`);
        }

        let player = await Player.findOne({ _id: player_sn, playerStatus: 'active' }, { _id: 1 });
        if (! player) return Promise.reject('player id is not in DB.');
    }),
    body('goal_scored_list').custom((goal_scored_list, { req, location, path}) => {
        if (req.body.game_mode == '3v3') {
            return goal_scored_list.length === 6
        }
        if (req.body.game_mode == '5v5') {
            return goal_scored_list.length === 10
        }
    }),
    body('goal_scored_list.*').toInt().isInt({ min: 0 }),
    body('character_id_list').custom((character_id_list, { req, location, path}) => {
        if (req.body.game_mode == '3v3') {
            return character_id_list.length === 6
        }
        if (req.body.game_mode == '5v5') {
            return character_id_list.length === 10
        }
    }),
    body('character_id_list.*').isArray({min:3,max:3}),
    body('character_id_list.*.*').isMongoId().withMessage('character_id is not valid MongoId.')
        .custom(async (character_id, { req, location, path}) => {
        let character_id_list = req.body.character_id_list;
        let count = 0;
        character_id_list.forEach( item => {
            if(item.id === character_id) count++;
        });
        if(count > 1) {
            return Promise.rejec(`character_id ${character_id} is duplicate.`);
        }

        let character = await Character.findOne({_id: character_id}, {_id: 1});
        if (! character) return Promise.reject('character id is not in DB.');
    }),
    body('started_at').exists().matches(/Z$/),
    body('finished_at').exists().matches(/Z$/),

    (req, res, next) => {
        let rs = req.validateRequest();
        if(rs === true) next();
    },
];

//**Notes*/
//(1): https://stackoverflow.com/a/46013025/11297747