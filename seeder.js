const { default: mongoose } = require("mongoose");
const seeder = require('mongoose-seed');
const teams = require('./seeders/TeamSeeder');
const playerPromise = require('./seeders/PlayerSeeder');
const characterPromise = require('./seeders/CharacterSeeder');
const gamePlayerPromise = require('./seeders/gamePlayerSeeder');
const Team = require('./models/team');
const Costume = require('./models/costume');
const Player = require('./models/player');
const Character = require('./models/character');
const Game = require('./models/game');
const GamePlayer = require('./models/gamePlayer');
const costumes = require('./seeders/CostumeSeeder');
const games = require('./seeders/GameSeeder');

seeder.connect('mongodb://localhost:27017/gtg_nodejs', async function () {
    try {
        // let collections = mongoose.connection.collections;
        // await Promise.all(Object.values(collections).map(async (collection) => {
        //     await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
        // }));

        // await Promise.all([
        //     Team.insertMany(teams),
        //     Costume.insertMany(costumes),
        //     Game.insertMany(games),

        // ]);
        // let characters = await characterPromise();
        // await Promise.all([
        //     Character.insertMany(characters),
        // ]);

        // let players = await playerPromise();
        // await Promise.all([
        //     Player.insertMany(players),
        // ]);

        let gamePlayers = await gamePlayerPromise();
        await Promise.all([
            GamePlayer.insertMany(gamePlayers),
        ]);
    } catch (err) {
        console.log(err);
    }
    seeder.disconnect();
});

//**Note */
// handle Promise exception: https://itnext.io/error-handling-with-async-await-in-js-26c3f20bc06a


