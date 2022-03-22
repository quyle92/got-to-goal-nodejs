const playerRoutes = require('./players.route');
const characterRoutes = require('./characters.route');
const { validationResult } = require('express-validator');
const Player = require('../models/player');

function route(app) {
    //** Custome middleware
    app.use(function (req, res, next) {
        //api reponse
        res.jsonSuccess = function (data) {
            return res.status(200).json({
                status: 'success',
                data: data
            });
        };

        //** Request validator:
        req.validateRequest = function () {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(422).json({ errors: errors.array() });

            //!! putting next() here  is WRONG  as it will jump over to the next top-level middleware (app.use()).
            //!! next();
        }

        next();
    });

    app.use(async function (req, res, next) {
        // set default max is 100
        if (req.query.limit >= 100) req.query.limit = 100;
        //set default user.
        req.body.player = await Player.findOne();
        // console.log(req.body.player._id)
        next();
    });

    app.use('/api/players', playerRoutes);
    app.use('/api/characters', characterRoutes);

    //** Handling route not found error.
    app.use((req, res, next) => {
        // console.log('Handling route not found exception')
        const error = new Error('Route Not Found.');
        error.status = 404
        next(error)
    });


}

module.exports = route;