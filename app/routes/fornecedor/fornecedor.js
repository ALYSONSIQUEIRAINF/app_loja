module.exports = function (application) {
    let version = require('../../../package').version;
    let app_name = require('../../../package').app_name;
    let copyright = require('../../../package').copyright;

    application.get('/cadastrar/fornecedor', async (req, res) => {
        res.render("fornecedor/cadastro", {
            "version": version,
            "app_name": app_name,
            "copyright": copyright,
            "tipo": req.session.tipo
        });
    });

    application.get('/alterar/fornecedor', async (req, res) => {
        res.render("fornecedor/altera", {
            "version": version,
            "app_name": app_name,
            "copyright": copyright,
            "tipo": req.session.tipo
        });
    });
};