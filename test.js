const db = require('./config/db');
db.connect();
const Team = require('./models/team');
const Player = require('./models/player');
const Character = require('./models/character');
const bcrypt = require('bcrypt');
const playerPromise = require('./seeders/PlayerSeeder');
const { faker } = require('@faker-js/faker');
const _sample = require('lodash/sample');

for (let i = 0; i <10; i++) {
    let rs = faker.datatype.number({
        'min': 1,
        'max': 10
    });
    console.log(rs)
}