module.exports = function (application) {
    let version = require('../../../package').version;
    let app_name = require('../../../package').app_name;
    let copyright = require('../../../package').copyright;

    application.get('/', async (req, res) => {
        res.render("home/index", {
            "version": version,
            "app_name": app_name,
            "copyright": copyright,
            "tipo": req.session.tipo
        });
    });
};