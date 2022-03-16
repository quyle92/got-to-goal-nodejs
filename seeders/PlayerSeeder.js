const { faker } = require('@faker-js/faker');
const Team = require('../models/team');
const bcrypt = require('bcrypt');
const getRandomItem = require('../utils/');
// connecting to mongodb
const { default: mongoose } = require("mongoose");
const db = require('../config/db');
 db.connect();

let playerPromise = async () =>  {
    try {
            let [teams, password] = await Promise.all([
                a,
                Team.find({}, { _id: 1 }).exec(),
                bcrypt.hash('123', 10)
            ]);

            let teamsIdList = teams.map((team) => {
                return team._id.toString()
            })

            let players = [];
            teamsIdList.forEach(function (teamId) {
                for (let i = 0; i < 10; i++) {
                    let lastTeam = getRandomItem([...teamsIdList].splice(teamsIdList.indexOf(teamId), 1));
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
                    })
                }
            });

            return (players)

    } catch (error) {
        console.log(error)
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
// https://stackoverflow.com/a/61379794/11297747,
//https://www.techiediaries.com/promise-all-map-async-await-example/

// handle Promise exception: https://itnext.io/error-handling-with-async-await-in-js-26c3f20bc06a
