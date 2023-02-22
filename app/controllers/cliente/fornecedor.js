require('dotenv').config({
    path: '../../.env'
});

const FornecedorDAO = require('../../models/dao/FornecedorDAO');
const Fornecedor = require('../../models/negocio/Fornecedor');
const mysql = require('mysql');

module.exports = function (application) {

    application.post('/cadastrar/fornecedor', async (req, res) => {
        let connection, fornecedorModel, records;
        try {

            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            fornecedorModel = new FornecedorDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await fornecedorModel.postFornecedor(new Fornecedor(req.body));

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

    application.get('/listar/fornecedores', async (req, res) => {
        let connection, fornecedorModel, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            fornecedorModel = new FornecedorDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await fornecedorModel.getFornecedores();

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

    application.patch('/alterar/dados/fornecedor', async (req, res) => {
        let connection, fornecedorModel;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            fornecedorModel = new FornecedorDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await fornecedorModel.alterarFornecedor(new Fornecedor(req.body));

            res.status(200).json({
                "tipo": 'success',
                "message": 'Fornecedor alterado com sucesso. <br>'
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

    application.delete('/excluir/fornecedor/:id', async (req, res) => {
        let connection, fornecedorModel;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            fornecedorModel = new FornecedorDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await fornecedorModel.excluirFornecedor({id_fornecedor: req.params.id});

            res.status(200).json({
                "tipo": 'success',
                "message": 'Fornecedor excluido com sucesso. <br>'
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