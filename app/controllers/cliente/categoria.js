require('dotenv').config({
    path: '../../.env'
});

const CategoriaDAO = require('../../models/dao/CategoriaDAO');
const Categoria = require('../../models/negocio/Categoria');
const mysql = require('mysql');

module.exports = function (application) {

    application.post('/cadastrar/categoria', async (req, res) => {
        let connection, categoriaModel, records;
        try {

            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            categoriaModel = new CategoriaDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await categoriaModel.postCategoria(new Categoria(req.body));

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

    application.get('/listar/categorias', async (req, res) => {
        let connection, categoriaModel, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            categoriaModel = new CategoriaDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await categoriaModel.getCategorias();

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

    application.patch('/alterar/dados/categoria', async (req, res) => {
        let connection, categoriaModel;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            categoriaModel = new CategoriaDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await categoriaModel.alterarCategoria(new Categoria(req.body));

            res.status(200).json({
                "tipo": 'success',
                "message": 'Categoria alterada com sucesso. <br>'
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

    application.delete('/excluir/categoria/:id', async (req, res) => {
        let connection, categoriaModel;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            categoriaModel = new CategoriaDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await categoriaModel.excluirCategoria({id_categoria: req.params.id});

            res.status(200).json({
                "tipo": 'success',
                "message": 'Categoria excluida com sucesso. <br>'
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