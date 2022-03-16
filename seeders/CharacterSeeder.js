const { faker } = require('@faker-js/faker');
let teams = [];
for (i = 0; i < 15; i++) {
    teams.push({
        characterName: faker.company.companyName(),
        defaultAvatar: faker.lorem.sentence(15),
        winnerAvatar: faker.datatype.number({ 'min': 10, 'max': 50 }),
        default_speed: faker.datatype.number({ 'min': 10, 'max': 50 }),
        default_passing: faker.datatype.number({ 'min': 10, 'max': 50 }),
        default_stamina: faker.datatype.number({ 'min': 10, 'max': 50 }),
        default_shooting: faker.datatype.number({ 'min': 10, 'max': 50 }),
        default_tackling: faker.datatype.number({ 'min': 10, 'max': 50 }),
    })
}
module.exports = teams;