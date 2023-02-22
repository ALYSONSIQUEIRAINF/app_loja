require('dotenv').config({
    path: '../../../.env'
});

module.exports = function (application) {
    let version = require('../../../package').version;
    let app_name = require('../../../package').app_name;
    let copyright = require('../../../package').copyright;

    application.get('/relatorio/pedidos', async (req, res) => {
        res.render("relatorio/pedidos", {
            "version": version,
            "app_name": app_name,
            "copyright": copyright,
            "tipo": req.session.tipo,
            "usuario_id": req.session.id_usuario
        });
    });

    application.get('/relatorio/pedido/:id', async (req, res) => {
        res.render("relatorio/pedido", {
            "version": version,
            "app_name": app_name,
            "copyright": copyright,
            "tipo": req.session.tipo,
            "usuario_id": req.session.id_usuario
        });
    });

    application.get('/relatorio/produto/comprar', async (req, res) => {
        res.render("relatorio/compras_produtos", {
            "version": version,
            "app_name": app_name,
            "copyright": copyright,
            "tipo": req.session.tipo,
            "usuario_id": req.session.id_usuario
        });
    });
};