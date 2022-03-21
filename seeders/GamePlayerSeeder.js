const { faker } = require('@faker-js/faker');
const Game = require('../models/game');
const Player = require('../models/player');
const Character = require('../models/character');
const { multipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');
const _sample = require('lodash/sample');

let gamePlayerPromise = async () => {
    try {
        let gamePlayers = [];
        let games = await Game.find({});
        games = multipleMongooseToObject(games);
        await Promise.all(games.map(async function (game) {
            if (game.gameMode === '3v3') {
                let player1s = [];
                for (let i = 0; i < 3; i++) {
                    let player1 = await getRandomPlayer(player1s);
                    player1s.push(player1);
                    gamePlayers.push({
                        gameId: game._id,
                        playerId: player1,
                        characterIdList: await getRandomCharacter(),
                        goalScored: faker.datatype.number({ min: 1, max: 10 }),
                        finalResult: i === 2 ? 'disconnected' : 'won',
                        createdAt: game.startedAt
                    });

                }

                let player2s = [];
                for (let i = 0; i < 3; i++) {
                    let player2 = await getRandomPlayer(player2s);
                    player2s.push(player2);
                    gamePlayers.push({
                        gameId: game._id,
                        playerId: player2,
                        characterIdList: await getRandomCharacter(),
                        goalScored: faker.datatype.number(1, 10),
                        finalResult: i === 2 ? 'disconnected' : 'lost',
                        createdAt: game.startedAt
                    });

                }
            }

            if (game.gameMode === '5v5') {
                let player1s = [];
                for (let i = 0; i < 5; i++) {
                    let player1 = await getRandomPlayer(player1s);
                    player1s.push(player1);
                    gamePlayers.push({
                        gameId: game._id,
                        playerId: player1,
                        characterIdList: await getRandomCharacter(),
                        goalScored: faker.datatype.number({ min: 1, max: 10 }),
                        finalResult: i === 2 ? 'disconnected' : 'won',
                        createdAt: game.startedAt
                    });

                }

                let player2s = [];
                for (let i = 0; i < 5; i++) {
                    let player2 = await getRandomPlayer(player2s);
                    player2s.push(player2);
                    gamePlayers.push({
                        gameId: game._id,
                        playerId: player2,
                        characterIdList: await getRandomCharacter(),
                        goalScored: faker.datatype.number(1, 10),
                        finalResult: i === 2 ? 'disconnected' : 'lost',
                        createdAt: game.startedAt
                    });
                }
            }

        })
        )
        // console.log(gamePlayers)

        return gamePlayers;
    } catch (error) {
        console.log(error)
    }

};

async function getRandomPlayer(excludedPlayers) {
    let playerIdList = await Player.find({}, { _id: 1 })
    do {
        var playerId = _sample(playerIdList);
    } while (excludedPlayers.includes(playerId));
    return mongooseToObject(playerId)._id;
}

async function getRandomCharacter() {
    let CharacterIdList = await Character.find({}, { _id: 1 });
    let selectedCharacters = [];
    while (selectedCharacters.length < 3) {
        //_sample(): get random element.
        let characterId = _sample(CharacterIdList);
        if (selectedCharacters.indexOf(characterId) === -1) selectedCharacters.push(characterId);
    }
    return multipleMongooseToObject(selectedCharacters);
}

module.exports = gamePlayerPromise;