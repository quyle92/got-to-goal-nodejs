const playerRoutes = require('./players.route');
const characterRoutes = require('./characters.route');
const gameRoutes = require('./games.route');
const { validationResult } = require('express-validator');
const Player = require('../models/player');

function route(app) {
    //** Custome middleware
    app.use(function (req, res, next) {
        //api reponse
        res.responseJson = function (data) {
            return res.status(200).json({
                status: 'success',
                data: data
            });
        };

        res.respondWithSuccess = function (message) {
            return res.status(200).json({
                status: 'success',
                message: message
            });
        };

        //** Request validator:
        req.validateRequest = function () {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(422).json({ errors: errors.array() });
            else
                return true;
            //!! putting next() here  is WRONG  as it will jump over to the next top-level middleware (app.use()).
            //!! next();
        }
        next();
    });

    app.use(async function (req, res, next) {
        // set default max is 100
        if (req.query.limit >= 100) req.query.limit = 100;
        //set default user(req.params.player will not work as  Express will repopulate the req.params object afterwards so we cannot use req.params.player in upcoming middlewares. Ref: https://stackoverflow.com/a/39048447/11297747)
        req.player = await Player.findOne();

        next();
    });

    app.use('/api/players', playerRoutes);
    app.use('/api/characters', characterRoutes);
    app.use('/api/games', gameRoutes);

    //** Handling route not found error.
    app.use((req, res, next) => {
        // console.log('Handling route not found exception')
        const error = new Error('Route Not Found.');
        error.status = 404
        next(error)
    });


}

module.exports = route;