const Character = require('../../models/character');

class CharacterController {
    async index(req, res, next) {
        try {
            let page = req.query.page ?? 1;
            let limit = req.query.limit ?? 10;
            let data = await Character.paginate({}, {
                offset: (page - 1)  * limit,
                limit: limit,
                populate: {
                    path: 'costumes',
                }
            });
            res.jsonSuccess(data);

        } catch (error) {
            next(error)
        }
    }


}

module.exports = new CharacterController;