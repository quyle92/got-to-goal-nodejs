const db = require('./config/db');
db.connect();
const Team = require('./models/team');
const Player = require('./models/player');
const bcrypt = require('bcrypt');
const playerPromise = require('./seeders/PlayerSeeder');

Player.findOne({}).populate('team').then(doc => console.log(doc));

