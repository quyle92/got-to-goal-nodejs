const Player = require('../../models/player');
const Costume = require('../../models/costume');
const res = require('express/lib/response');

class PlayerController {
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
            res.jsonSuccess(data);

        } catch (error) {
            next(error)
        }
    }

    async selectCharacters(req, res, next) {
        try {
            res.json('ok')
        } catch (error) {
            next(error)
        }
    }


}

module.exports = new PlayerController;