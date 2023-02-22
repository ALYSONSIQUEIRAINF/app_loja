module.exports = function (application) {
    let version = require('../../../package').version;
    let app_name = require('../../../package').app_name;
    let copyright = require('../../../package').copyright;

    application.get('/cadastrar/embalagem', async (req, res) => {
        res.render("embalagem/cadastro", {
            "version": version,
            "app_name": app_name,
            "copyright": copyright,
            "tipo": req.session.tipo
        });
    });

    application.get('/alterar/embalagem', async (req, res) => {
        res.render("embalagem/altera", {
            "version": version,
            "app_name": app_name,
            "copyright": copyright,
            "tipo": req.session.tipo
        });
    });
};