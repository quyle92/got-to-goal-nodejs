const { faker } = require('@faker-js/faker');
let teams = [];
for(i = 0; i < 100; i++) {
    teams.push({
        teamName: faker.company.companyName(),
        description: faker.lorem.sentence(15),
        maxPlayer: faker.datatype.number({ 'min': 10, 'max': 50 }),
    })
}
module.exports = teams;