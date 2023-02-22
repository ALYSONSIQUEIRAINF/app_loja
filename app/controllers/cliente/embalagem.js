require('dotenv').config({
    path: '../../.env'
});

const EmbalagemDAO = require('../../models/dao/EmbalagemDAO');
const Embalagem = require('../../models/negocio/Embalagem');
const mysql = require('mysql');

module.exports = function (application) {

    application.post('/cadastrar/embalagem', async (req, res) => {
        let connection, embalagemModel;
        try {

            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            embalagemModel = new EmbalagemDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await embalagemModel.postEmbalagem(new Embalagem(req.body));

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

    application.get('/listar/embalagens', async (req, res) => {
        let connection, embalagemModel, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            embalagemModel = new EmbalagemDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await embalagemModel.getEmbalagens();

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

    application.patch('/alterar/dados/embalagem', async (req, res) => {
        let connection, embalagemModel;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            embalagemModel = new EmbalagemDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await embalagemModel.alterarEmbalagem(new Embalagem(req.body));

            res.status(200).json({
                "tipo": 'success',
                "message": 'Embalagem alterada com sucesso. <br>'
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

    application.delete('/excluir/embalagem/:id', async (req, res) => {
        let connection, embalagemModel;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            embalagemModel = new EmbalagemDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await embalagemModel.excluirEmbalagem({id_fornecedor: req.params.id});

            res.status(200).json({
                "tipo": 'success',
                "message": 'Embalagem excluida com sucesso. <br>'
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