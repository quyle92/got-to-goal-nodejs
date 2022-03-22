const Player = require('../../models/player');
const Costume = require('../../models/costume');
const res = require('express/lib/response');
const GameService = require('../../services/api/GameService');
class GameController {
    async index(req, res, next) {
        try {
            let page = req.query.page ?? 1;
            let limit = req.query.limit ?? 10;
            let data = await Player.paginate({}, {
                offset: (page - 1)  * limit,
                limit: limit,
                populate: {
                    path: 'characters',
                    populate: {
                        path: 'purchased_costumes',
                        model: Costume
                    }
                }
            });
            res.responseJson(data);

        } catch (error) {
            next(error)
        }
    }

    async selectCharacters(req, res, next) {
        try {
            let player = req.player;
            let character = req.character;
            await characterService.saveCharacterBeforeTutorial(player, character);
            res.respondWithSuccess('Characters selection saved.');
        } catch (error) {
            next(error)
        }
    }

    async getHomeData(req, res, next) {
        try {
            let player = req.player;
            let tutorialStartedAt = player.tutorialStartedAt;
            let tutorialStepPassed = player.tutorialStepPassed;
            let result = {
                "game_status": {
                    "football_team": player.isUnlockTeam,
                    "h2h": player.isUnlockH2h,
                    "shop": player.isUnlockShop
                },
                "coin": player.coin,
                "premium_currency": player.premiumCurrency,
                "tutorial": {
                    "tutorial_at": tutorialStartedAt,
                    "step": tutorialStepPassed,
                },
                "boosters": {
                    "rocket": player.rocket,
                    'energy_drink': player.energyDrink,
                    'new_boots': player.newBoots,
                    'megashield': player.megashield,
                    'compass': player.compass,
                }

            };

            res.responseJson(result);
        } catch (error) {
            next(error)
        }
    }


}

module.exports = new GameController;