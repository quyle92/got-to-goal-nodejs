const { faker } = require('@faker-js/faker');
const Team = require('../models/team');
const Character = require('../models/character');
const bcrypt = require('bcrypt');
const getRandomItem = require('../utils/');
const _sample = require('lodash/sample');

const { default: mongoose } = require("mongoose");


let playerPromise = async () =>  {
    try {
        let [teams, password] = await Promise.all([
            Team.find({}, { _id: 1 }).exec(),
            bcrypt.hash('123', 10)
        ]);

        let teamsIdList = teams.map((team) => {
            return team._id.toString()
        });

        let players = [];

        await Promise.all(
            teamsIdList.map(async function (teamId) {
                for (let i = 0; i < 10; i++) {
                    let lastTeam = getRandomItem([...teamsIdList].splice(teamsIdList.indexOf(teamId), 1));
                    //**Character processing */
                    let characters = [];
                    let defaultCharacters = await Character.find({}, { _id: 1, costumes: 1 }).limit(3);
                    let selectedCharacterIdList = []
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
                        obj['superpowerLevel'] = faker.datatype.number({ 'min': 1, 'max': 5 });

                        let costumes = character.costumes;

                        let selectCustomes = []
                        while (selectCustomes.length < 3) {
                            //_sample(): get random element
                            let r = _sample(costumes);
                            if (selectCustomes.indexOf(r) === -1) selectCustomes.push(r);
                        }
                        obj['purchased_costumes'] = selectCustomes;
                        characters.push(obj);

                    }

                    //**End of Character processing */
                    players.push({
                        playerName: faker.company.companyName(),
                        team: mongoose.Types.ObjectId(teamId),
                        isLeader: i === 0 ? 1 : 0,
                        teamJoinedAt: faker.datatype.datetime(),
                        teamDismissedInfo: {
                            teamId: mongoose.Types.ObjectId(lastTeam),
                            dismissedAt: faker.datatype.datetime(),
                        },
                        tutorialStartedAt: faker.datatype.datetime(),
                        tutorialStepPassed: faker.datatype.number({ 'min': 1, 'max': 5 }),
                        coin: faker.datatype.number({ 'min': 1, 'max': 100 }),
                        premiumCurrency: faker.datatype.number({ 'min': 1, 'max': 100 }),
                        rocket: faker.datatype.number({ 'min': 1, 'max': 100 }),
                        energyDrink: faker.datatype.number({ 'min': 1, 'max': 100 }),
                        newBoots: faker.datatype.number({ 'min': 1, 'max': 100 }),
                        megashield: faker.datatype.number({ 'min': 1, 'max': 100 }),
                        compass: faker.datatype.number({ 'min': 1, 'max': 100 }),
                        email: faker.internet.email(),
                        password: password,
                        characters: characters
                    })
                }
            })
        );

        return (players)

    } catch (error) {
        console.error(error)
       throw new Error(error)

    }
}


// }

module.exports = playerPromise;

/**
 * Note
 */
//(1): Don't use callbacks with async/await.
//Ref: https://stackoverflow.com/questions/68996929/mongooseerror-query-was-already-executed-todo-updateone-id-new-objectid6,
// https://stackoverflow.com/a/61379794/11297747 (need to put await before  Promise.all()),
//https://www.techiediaries.com/promise-all-map-async-await-example/

// handle Promise exception: https://itnext.io/error-handling-with-async-await-in-js-26c3f20bc06a
