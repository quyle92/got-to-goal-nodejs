const Player = require('../../models/player');
const Costume = require('../../models/costume');

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


}

module.exports = new PlayerController;