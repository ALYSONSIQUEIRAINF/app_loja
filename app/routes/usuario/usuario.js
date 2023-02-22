require('dotenv').config({
    path: '../../../.env'
});

const mysql = require('mysql');
const ClienteDAO = require('../../models/dao/ClienteDAO');

module.exports = function (application) {
    let version = require('../../../package').version;
    let app_name = require('../../../package').app_name;
    let copyright = require('../../../package').copyright;

    application.get('/cadastrar/usuario', async (req, res) => {
        let connection, clienteModel, records;

        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            clienteModel = new ClienteDAO(connection);

            records = await clienteModel.getClientes({
                "tipo": 1
            });

            res.render("usuario/cadastro", {
                "version": version,
                "app_name": app_name,
                "copyright": copyright,
                "recordsCliente": records,
                "tipo": req.session.tipo
            });
        } catch (error) {
            res.render("usuario/cadastro", {
                "version": version,
                "app_name": app_name,
                "copyright": copyright,
                "recordsCliente": [],
                "tipo": req.session.tipo
            });
        }
    });

    application.get('/alterar/usuario', async (req, res) => {
        let connection, clienteModel, records;

        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            clienteModel = new ClienteDAO(connection);

            records = await clienteModel.getClientes({
                "tipo": 1
            });

            res.render("usuario/altera", {
                "version": version,
                "app_name": app_name,
                "copyright": copyright,
                "recordsCliente": records,
                "tipo": req.session.tipo
            });
        } catch (error) {
            res.render("usuario/altera", {
                "version": version,
                "app_name": app_name,
                "copyright": copyright,
                "recordsCliente": [],
                "tipo": req.session.tipo
            });
        }
    });
};