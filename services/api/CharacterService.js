const Player = require('../../models/player');
const Character = require('../../models/character');
const res = require('express/lib/response');

class CharacterService {
    async saveCharacterBeforeTutorial(player, character) {
        let characters = [];
        let defaultCharacters = await Character.find({}).limit(3);
        defaultCharacters.push(character);
        defaultCharacters.forEach(function(character, i) {
            characters.push({
                _id: character._id,
                speed: character.default_speed,
                passing: character.default_passing,
                stamina: character.default_stamina,
                shooting: character.default_shooting,
                tackling: character.default_tackling,
                status: i === 3 ? 'selected' : 'unlocked'
            })
        });
        // console.log(characters.length);

        await Player.where({_id: player._id}).updateOne({$set: {characters: characters} });
    }
}

module.exports = new CharacterService;