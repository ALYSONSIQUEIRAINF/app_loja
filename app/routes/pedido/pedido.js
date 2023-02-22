require('dotenv').config({
    path: '../../../.env'
});

const mysql = require('mysql');
const ProdutoDAO = require('../../models/dao/ProdutoDAO');
const PedidoDAO = require('../../models/dao/PedidoDAO');

module.exports = function (application) {
    let version = require('../../../package').version;
    let app_name = require('../../../package').app_name;
    let copyright = require('../../../package').copyright;

    application.get('/cadastrar/pedido', async (req, res) => {
        let connection, produtoModel, pedidoModel;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            produtoModel = new ProdutoDAO(connection);
            pedidoModel = new PedidoDAO(connection);
            recordsProdutos = await produtoModel.getProdutosResumido();
            recordsRascunho = await pedidoModel.getRascunho({
                "id_usuario": req.session.id_usuario
            });

            res.render("pedido/cadastro", {
                "version": version,
                "app_name": app_name,
                "copyright": copyright,
                "tipo": req.session.tipo,
                "recordsProdutos": recordsProdutos,
                "recordsRascunho": recordsRascunho,
                "usuario_id": req.session.id_usuario
            });
        } catch (error) {
            res.render("pedido/cadastro", {
                "version": version,
                "app_name": app_name,
                "copyright": copyright,
                "tipo": req.session.tipo,
                "recordsProdutos": [],
                "recordsRascunho": [],
                "usuario_id": 0
            });
        }
    });
};