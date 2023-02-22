require('dotenv').config({
    path: '../../.env'
});

const FabricanteDAO = require('../../models/dao/FabricanteDAO');
const Fabricante = require('../../models/negocio/Fabricante');
const mysql = require('mysql');

module.exports = function (application) {

    application.post('/cadastrar/fabricante', async (req, res) => {
        let connection, fabricanteModel, records;
        try {

            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            fabricanteModel = new FabricanteDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await fabricanteModel.postFabricante(new Fabricante(req.body));

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

    application.get('/listar/fabricantes', async (req, res) => {
        let connection, fabricanteModel, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            fabricanteModel = new FabricanteDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await fabricanteModel.getFabricantes();

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

    application.patch('/alterar/dados/fabricante', async (req, res) => {
        let connection, fabricanteModel;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            fabricanteModel = new FabricanteDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await fabricanteModel.alterarFabricante(new Fabricante(req.body));

            res.status(200).json({
                "tipo": 'success',
                "message": 'Fabricante alterado com sucesso. <br>'
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

    application.delete('/excluir/fabricante/:id', async (req, res) => {
        let connection, fabricanteModel;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            fabricanteModel = new FabricanteDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await fabricanteModel.excluirFabricante({id_fabricante: req.params.id});

            res.status(200).json({
                "tipo": 'success',
                "message": 'Fabricante excluido com sucesso. <br>'
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