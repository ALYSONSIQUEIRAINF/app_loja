require('dotenv').config({
    path: '../../.env'
});

const UsuarioDAO = require('../../models/dao/UsuarioDAO');
const Usuario = require('../../models/negocio/Usuario');
const mysql = require('mysql');

module.exports = function (application) {

    application.post('/cadastrar/usuario', async (req, res) => {
        let connection, usuarioModel, records;
        try {

            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            usuarioModel = new UsuarioDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await usuarioModel.postUsuario(new Usuario(req.body));

            res.redirect('/');
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        } finally {
            if (connection) {
                try {
                    connection.end();
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
    })

    application.get('/listar/usuarios', async (req, res) => {
        let connection, usuarioModel, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            usuarioModel = new UsuarioDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await usuarioModel.getUsuarios();

            recordsTotal = records ? records.length : 0;
            rows = records != 0 ? records : [];

            var tableData = {
                draw: draw,
                recordsTotal: recordsTotal,
                recordsFiltered: recordsTotal
            };

            tableData.data = rows;

            res.status(200).json(tableData);
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        } finally {
            if (connection) {
                try {
                    connection.end();
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
    })

    application.patch('/alterar/dados/usuario', async (req, res) => {
        let connection, usuarioModel, records;
        try {

            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            usuarioModel = new UsuarioDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await usuarioModel.updateUsuario(new Usuario(req.body));

            res.status(200).json({
                "tipo": 'success',
                "message": 'Usuário alterado com sucesso. <br>'
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        } finally {
            if (connection) {
                try {
                    connection.end();
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
    })
}