const seeder = require('mongoose-seed');
const teams = require('./seeders/TeamSeeder');
const playerPromise = require('./seeders/PlayerSeeder');
// playerPromise.then(v=>console.log(v))

Promise.all([playerPromise]).then((values) => {
    let data = [];
    [players] = values;
    data.push({
        'model': 'Team',
        'documents': [
            ...teams
        ]
    });
    data.push({
        'model': 'Player',
        'documents': [
            ...players
        ]
    });
    seeder.connect('mongodb://localhost:27017/gtg_nodejs', function () {

        // Load Mongoose models
        seeder.loadModels([
            'models/team.js',
            'models/player.js',
        ]);

        // Clear specified collections
        seeder.clearModels(['Team', 'Player'], function () {

            // Callback to populate DB once collections have been cleared
            seeder.populateModels(data, function () {
                seeder.disconnect();
            });

        });
    });

});
