const playerRoutes = require('./players.route');
const characterRoutes = require('./characters.route');

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

        next();
    });

    app.all(async function (req, res, next) {
        // set default max is 100
        if (req.query.limit >= 100) req.query.limit = 100;
        //set default user.
        req.params.player = await Player.findOne();
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