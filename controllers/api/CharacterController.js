const Character = require('../../models/character');
const GamePlayer = require('../../models/gamePlayer');

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
            res.responseJson(data);

        } catch (error) {
            next(error)
        }
    }

    async getCharacterSelectionStats(req, res, next) {
        try {
            let rs = await GamePlayer.aggregate([
                {
                    $unwind: "$characterIdList"
                },
                { $group: { _id: "$characterIdList", count: { $sum: 1 } } },
                {
                    $lookup:
                    {
                        from: "characters",
                        localField: "_id",
                        foreignField: "_id",
                        as: "character"
                    }
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$character", 0] }, "$$ROOT"] } }
                },
                {
                    $project: {
                        characterName: 1,
                        count: 1
                    }
                }
            ]);//https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#std-label-null-example
            //https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/#std-label-lookup-single-equality
            res.responseJson(rs);

        } catch (err) {
            next(err)
        }
    }

}

module.exports = new CharacterController;