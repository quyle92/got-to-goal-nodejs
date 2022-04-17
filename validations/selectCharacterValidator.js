const { body, check } = require('express-validator');
const req = require('express/lib/request');
const res = require('express/lib/response');
const Character = require('../models/character');

exports.selectCharacterValidator = [
    body('characterId').exists().withMessage('characterId must be present.').bail().
        isMongoId().withMessage('characterId is not of MongoDb format.').bail()
        .custom((characterId, { req, location, path } ) => { //(1)
        return Character.findOne({ _id: characterId }).then(character => {
            if(!character) {
                return Promise.reject('Character Id not found');
            }
            let player = req.player;
            let characterIDList = [];

            player.characters.forEach( item => {
                characterIDList.push(item._id.toString())
            });

            if (characterIDList.includes(character._id.toString())) {
                return Promise.reject('Character already selected!');
            }

            req.character = character;
            next();
        })
    }),

    (req, res, next) => {
        req.validateRequest();
    },
];

//**Notes*/
//(1): https://stackoverflow.com/a/46013025/11297747