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
                    console.log(player1)
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
                    let player2 = await getRandomPlayer(player2s)
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

            // if (game.gameMode === '5v5') {
            //     let player1s = [];
            //     for (let i = 0; i < 5; i++) {
            //         let player1 = getRandomCharacter(player1s)
            //         gamePlayers.push({
            //             gameId: game._id,
            //             playerId: player1,
            //             characterIdList: getRandomCharacter(),
            //             goalScored: faker.datatype.number(1, 10),
            //             finalResult: i === 2 ? 'disconnected' : 'won',
            //             createdAt: game.startedAt
            //         });

            //     }

            //     let player2s = [];
            //     for (let i = 0; i < 5; i++) {
            //         let player2 = getRandomCharacter(player2s)
            //         gamePlayers.push({
            //             gameId: game._id,
            //             playerId: player2,
            //             characterIdList: getRandomCharacter(),
            //             goalScored: faker.datatype.number(1, 10),
            //             finalResult: i === 2 ? 'disconnected' : 'lost',
            //             createdAt: game.startedAt
            //         });
            //     }
            // }

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
    // let selectedPlayer = [];
    // while (selectedPlayer.length !== 1) {
    //     //_sample(): get random element.
    //     let playerId = _sample(playerIdList);
    //     if (!excludedPlayers.includes(playerId)) selectedPlayer.push(playerId);
    // }
    do {
        let playerId = _sample(playerIdList);
    } while (excludedPlayers.includes(playerId));
    console.log(selectedPlayer[0])
    return mongooseToObject(selectedPlayer[0])._id;
}

async function getRandomCharacter() {
    let CharacterIdList = await Character.find({}, { _id: 1 });
    let selectedCharacters = [];
    while (selectedCharacters.length < 3) {
        //_sample(): get random element.
        let characterId = _sample(CharacterIdList);
        if (selectedCharacters.indexOf(r) === -1) selectedCharacters.push(characterId);
    }
    return mongooseToObject(selectedCharacters)._id;
}

module.exports = gamePlayerPromise;