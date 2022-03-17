const { faker } = require('@faker-js/faker');
const Costume = require('../models/costume');
let characterPromise = async () => {
    let characters = [];
    let defaultNames = ['Orthur', 'J-Tron', 'Bethany', 'Ronan', 'Tsarra', 'Baloroth', 'Rahu', 'Chimney', 'Ethan', 'Mohandas', 'Ozul', 'Rye', 'Onnophris', 'Dex','Balor'];
    try {
        await Promise.all(
            defaultNames.map(async (item, idx) => {
                var costumeIDList = await Costume.find({}, { _id: 1 }).skip(idx * 8).limit(8);
                costumeIDList = costumeIDList.map((item) => {
                    return item._id.toString();
                });
                characters.push({
                    characterName: item,
                    defaultAvatar: faker.image.imageUrl(),
                    winnerAvatar: faker.image.imageUrl(),
                    default_speed: faker.datatype.number({ 'min': 10, 'max': 50 }),
                    default_passing: faker.datatype.number({ 'min': 10, 'max': 50 }),
                    default_stamina: faker.datatype.number({ 'min': 10, 'max': 50 }),
                    default_shooting: faker.datatype.number({ 'min': 10, 'max': 50 }),
                    default_tackling: faker.datatype.number({ 'min': 10, 'max': 50 }),
                    costumes: [...costumeIDList]
                })
            })
        );
        return characters;

    } catch (err) {
        console.log(err)
    }
}
module.exports = characterPromise;