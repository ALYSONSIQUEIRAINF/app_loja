require('dotenv').config({
    path: '../../.env'
});

const PedidoDAO = require('../../models/dao/PedidoDAO');
const PedidoItemDAO = require('../../models/dao/PedidoItemDAO');
const ProdutoDAO = require('../../models/dao/ProdutoDAO');
const Pedido = require('../../models/negocio/Pedido');
const PedidoItem = require('../../models/negocio/PedidoItem');
const mysql = require('mysql');

module.exports = function (application) {

    application.post('/cadastrar/pedido/item', async (req, res) => {
        let connection, pedidoModel, pedidoItemModel;
        let params = {

        } = req.body;

        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            pedidoModel = new PedidoDAO(connection);
            pedidoItemModel = new PedidoItemDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            if (!Number(params.pedido_id)) {
                await pedidoModel.postPedido(new Pedido(params));

                let idPedido = await pedidoModel.buscaUltimoRegistroInserido();

                params.pedido_id = idPedido[0].ID_PEDIDO;
            }

            await pedidoItemModel.postItemPedido(new PedidoItem(params));

            res.status(200).json({
                "tipo": 'success',
                "pedido_id": params.pedido_id
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

    application.get('/listar/itens/pedido/rascunho/:id', async (req, res) => {
        let connection, pedidoModel, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            pedidoModel = new PedidoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await pedidoModel.buscaDadosPedidoRascunho({
                "pedido_id": req.params.id,
                "usuario_id": req.session.id_usuario
            });

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

    application.delete('/excluir/rascunho/:id', async (req, res) => {
        let connection, pedidoModel, pedidoItemModel;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            pedidoModel = new PedidoDAO(connection);
            pedidoItemModel = new PedidoItemDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await pedidoItemModel.excluirItensRascunho({ id_pedido: req.params.id });
            await pedidoModel.excluirRascunho({ id_pedido: req.params.id });

            res.status(200).json({
                "tipo": 'success',
                "message": 'Rascunho excluido com sucesso. <br>'
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

    application.post('/cadastrar/pedido', async (req, res) => {
        let connection, pedidoModel, produtoModel, pedidoItemModel;
        let params = {

        } = req.body;

        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            pedidoModel = new PedidoDAO(connection);
            pedidoItemModel = new PedidoItemDAO(connection);
            produtoModel = new ProdutoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await pedidoModel.fechaPedido(new Pedido(params));

            let recordsProdutos = await pedidoItemModel.buscaItensPedido({
                "id_pedido": params.id_pedido
            })

            for (const produto of recordsProdutos) {
                await produtoModel.abateSaldoProduto({
                    "id_produto": produto.PRODUTO_ID,
                    "quantidade": produto.QUANTIDADE
                });
            }

            res.status(200).json({
                "tipo": 'success'
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

    application.get('/busca/pedido/between/:dataInicial/:dataFinal', async (req, res) => {
        let connection, pedidoModel, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            pedidoModel = new PedidoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await pedidoModel.buscaPedidosBetween({
                "data_inicio": req.params.dataInicial + ' 00:00:01',
                "data_fim": req.params.dataFinal + ' 23:59:59'
            });

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

    application.get('/busca/itens/pedido/:id', async (req, res) => {
        let connection, pedidoModel, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            pedidoModel = new PedidoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await pedidoModel.buscaDadosPedido({
                "pedido_id": req.params.id
            });

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
}