const { faker } = require('@faker-js/faker');
const Team = require('../models/team');
const bcrypt = require('bcrypt');

// connecting to mongodb
const db = require('../config/db');
db.connect();

let playerPromise = new Promise(  (resolve, reject) => {
    //(1)
    // resolve(Team.findOne({}, { _id: 1 }, function (err, teams) {
    //     return (teams)
    // })) ;==> not work as you're using callback.

    // resolve(Team.findOne({}, { _id: 1 }).then(team=>(team))) ;==>  work

    // resolve(await Team.findOne({}))==>  work

    let rs = Team.find({}, { _id: 1 }).then(async (teams) => {
        let players = [];
        await Promise.all(teams.map(async function (team) {
            for (let i = 0; i < 1; i++) {
                var random = faker.datatype.number({ 'min': 1, 'max': 100 })
                var teamId = await Team.findOne({ _id: { $ne: team._id } }).skip(random).exec();

                var password = await bcrypt.hash('123', 10);
                players.push({
                    playerName: faker.company.companyName(),
                    team: teamId,
                    isLeader: i === 0 ? 1 : 0,
                    teamJoinedAt: faker.datatype.datetime(),
                    teamDismissedInfo: {
                        teamId: teamId,
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


        }));
        // console.log(players)
        return players
    });

    resolve(rs)


});



module.exports = playerPromise;

/**
 * Note
 */
//(1): Don't use callbacks with async/await.
//Ref: https://stackoverflow.com/questions/68996929/mongooseerror-query-was-already-executed-todo-updateone-id-new-objectid6,
// https://stackoverflow.com/a/70654806/11297747,
// https://stackoverflow.com/questions/68996929/mongooseerror-query-was-already-executed-todo-updateone-id-new-objectid6
