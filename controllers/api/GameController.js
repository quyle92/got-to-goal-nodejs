const Game = require('../../models/game');
const GamePlayer = require('../../models/gamePlayer');
const { default: mongoose } = require("mongoose");
class GameController {
    async updateGameResult(req, res, next) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            let game = await Game.create([{
                gameMode: req.body.gameMode,
                tieBreaker: req.body.tieBreaker,
                privacy: req.body.privacy,
                resultSet: req.body.resultSet,
                startedAt: req.body.startedAt,
                finishedAt: req.body.finishedAt,
            }], { session });
            let { playerIdList, finalResultList, goalScoredList, characterIdList } = req.body,
            input = [],
            i = 0;

            playerIdList.forEach((playerId) => {
                input.push({
                    gameId: game[0]._id,
                    playerId: playerId,
                    finalResult: finalResultList[i],
                    goalScored: goalScoredList[i],
                    characterId: characterIdList[i],
                });
                i++;
            });
            await GamePlayer.insertMany(input, { session });
            await session.commitTransaction();
            res.respondWithSuccess('data inserted successfully!');
        } catch (error) {
            await session.abortTransaction();
            next(error);
        } finally {
            // Ending the session
            session.endSession();
        }

    }
}

module.exports = new GameController;