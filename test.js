const db = require('./config/db');
db.connect();
const Team = require('./models/team');
const Player = require('./models/player');
const Character = require('./models/character');
const bcrypt = require('bcrypt');
const playerPromise = require('./seeders/PlayerSeeder');
const { faker } = require('@faker-js/faker');
const _sample = require('lodash/sample');

let characters = [];
(async () => {
    try {
        let defaultCharacters = await Character.find({}, { _id: 1, costumes: 1 }).limit(3);
        let selectedCharacterIdList = [];
        Promise.all([1, 2, 3].map(async i => {
            for (let i = 0; i < 5; i++) {
                let obj = {};
                if ([0, 1, 2].includes(i)) {
                    var character = defaultCharacters[i];
                    obj['_id'] = character.toObject()._id;
                    selectedCharacterIdList.push(obj['_id'])
                    obj['status'] = 'selected';
                }
                else {
                    let random = function (min, max) {
                        return Math.ceil(Math.random() * (max - min) + min);
                    }
                    var character = await Character.
                        findOne({ field: { $nin: selectedCharacterIdList } }, { _id: 1, costumes: 1 })
                        .skip(random(3, 14))
                        .limit(1);
                    obj['_id'] = character.toObject()._id;
                    selectedCharacterIdList.push(obj['_id'])
                    obj['status'] = 'unlocked';
                }
                obj['point'] = faker.datatype.number({ 'min': 10, 'max': 50 });
                obj['speed'] = faker.datatype.number({ 'min': 10, 'max': 50 });
                obj['passing'] = faker.datatype.number({ 'min': 10, 'max': 50 });
                obj['stamina'] = faker.datatype.number({ 'min': 10, 'max': 50 });
                obj['shooting'] = faker.datatype.number({ 'min': 10, 'max': 50 });
                obj['tackling'] = faker.datatype.number({ 'min': 10, 'max': 50 });
                obj['superpowerLevel'] = faker.datatype.number({ 'min': 10, 'max': 50 });

                let costumes = character.costumes;
                let selectCustomes = []
                while (selectCustomes.length < 3) {
                    let r = _sample(costumes);
                    if (selectCustomes.indexOf(r) === -1) selectCustomes.push(r);
                }
                obj['costumes'] = selectCustomes;
                characters.push(obj);
            }
        }))
        console.log(characters)
        console.log(characters.length)
    } catch (error) {
        console.log(error)
    }

})();


