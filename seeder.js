const { default: mongoose } = require("mongoose");
const seeder = require('mongoose-seed');
const teams = require('./seeders/TeamSeeder');
const Team = require('./models/team');
const Player = require('./models/player');
const playerPromise = require('./seeders/PlayerSeeder');


seeder.connect('mongodb://localhost:27017/gtg_nodejs', async function () {
    try {
        let collections = mongoose.connection.collections;
        await Promise.all(Object.values(collections).map(async (collection) => {
            await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
        }));

        await Promise.all([
            Team.insertMany(teams),
        ]);
        let players = await playerPromise();
        await Promise.all([
            Player.insertMany(players),
        ]);
    } catch (err) {
        console.log(err);
    }

    seeder.disconnect();
});

/**Note */
// handle Promise exception: https://itnext.io/error-handling-with-async-await-in-js-26c3f20bc06a


