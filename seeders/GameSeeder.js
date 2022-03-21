const { faker } = require('@faker-js/faker');
const Game = require('../models/game');
const _sample = require('lodash/sample');

let games = [];
let gameMode = Game.schema.path('gameMode').enumValues;
let tieBreaker = Game.schema.path('tieBreaker').enumValues;
let privacy = Game.schema.path('privacy').enumValues;

//ref:  generaterandom dates within two dates: https://stackoverflow.com/a/9035732/11297747
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

for(i = 0; i < 5000; i++) {
    let startedAt = randomDate(new Date(2012, 0, 1), new Date());
    games.push({
        gameMode: _sample(gameMode),
        tieBreaker: _sample(tieBreaker),
        privacy: _sample(privacy),
        result_set: [
            faker.datatype.number({ 'min': 1, 'max': 10}) + '-' + faker.datatype.number({ 'min': 1, 'max': 10}),
            faker.datatype.number({ 'min': 1, 'max': 10}) + '-' + faker.datatype.number({ 'min': 1, 'max': 10}),
            faker.datatype.number({ 'min': 1, 'max': 10}) + '-' + faker.datatype.number({ 'min': 1, 'max': 10}),
        ],
        startedAt: startedAt,
    })
}
module.exports = games;