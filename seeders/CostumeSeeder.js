const { faker } = require('@faker-js/faker');
const Character = require('../models/character')
let costumes = [];
let defaultNames = ['Orthur', 'J-Tron', 'Bethany', 'Ronan', 'Tsarra', 'Baloroth', 'Rahu', 'Chimney', 'Ethan', 'Mohandas', 'Ozul', 'Rye', 'Onnophris', 'Dex', 'Balor'];
defaultNames.forEach(async item => {
    try {
        // var character = await Character.findOne({ characterName: item });
        // var characterId = character.toObject()._id;
        for (let i = 0; i < 8; i++) {
            costumes.push({
                costumeUrl: faker.image.imageUrl(),
                coin: faker.datatype.number({ 'min': 10, 'max': 50 }),
                premiumCurrency: faker.datatype.number({ 'min': 10, 'max': 50 }),
                // characterId: characterId
            });
        }
    } catch (error) {
        console.log(error)
    }


})
module.exports = costumes;