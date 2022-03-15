// const newsRouter = require('./news.js');
const Team = require('../models/team');
const playerPromise = require('../seeders/PlayerSeeder');
const { default: mongoose } = require("mongoose");
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

function route(app) {
    app.use('/teams', async (req, res, next) => {
        let rs = Team.find({}, { _id: 1 }).then(teams => {
            let players = [];
            teams.forEach(async function (team) {
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
            });
        });

        res.json(players)
    })

}

module.exports = route;