const { body, validationResult } = require('express-validator');
const Character = require('../models/character');

exports.selectCharacterValidator = [
    body('characterId').exists().withMessage('characterId must be present.').
    isMongoId().withMessage('characterId is not of MongoId format.')
        .custom((characterId, { req, loc, path } ) => { //(1)
        return Character.findOne({ _id: characterId }).then(character => {
            if(!character) {
                return Promise.reject('Character Id not found');
            }
            let player = req.body.player;
            let characterIDList = [];

            player.characters.forEach( item => {
                characterIDList.push(item._id.toString())
            });

            if (characterIDList.includes(character._id.toString())) {
                return Promise.reject('Character already selected.');
            }
        })
    }),

    (req, res, next) => {
        req.validateRequest()
        next();
    },
];

//**Notes*/
//(1): https://stackoverflow.com/a/46013025/11297747