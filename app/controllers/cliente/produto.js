require('dotenv').config({
    path: '../../.env'
});

const ProdutoDAO = require('../../models/dao/ProdutoDAO');
const Produto = require('../../models/negocio/Produto');
const mysql = require('mysql');

module.exports = function (application) {

    application.post('/cadastrar/produto', async (req, res) => {
        let connection, produtoModel, embalagens = [];
        try {
            embalagens = req.body.embalagens;

            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            produtoModel = new ProdutoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await produtoModel.postProduto(new Produto(req.body));

            let idProduto = await produtoModel.buscaUltimoRegistroInserido();

            for (const embalagem of embalagens) {
                await produtoModel.postEmbalagensProduto({
                    "produto_id": idProduto[0].ID_PRODUTO,
                    "embalagem_id": Number(embalagem)
                })
            }

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

    application.get('/listar/produtos', async (req, res) => {
        let connection, produtoModel, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            produtoModel = new ProdutoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await produtoModel.getProdutos({
                "reserva_estoque": req.session.reserva
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

    application.patch('/alterar/dados/produto', async (req, res) => {
        let connection, produtoModel;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            produtoModel = new ProdutoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await produtoModel.alterarProduto(new Produto(req.body));

            res.status(200).json({
                "tipo": 'success',
                "message": 'Produto alterado com sucesso. <br>'
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

    application.delete('/excluir/produto/:id', async (req, res) => {
        let connection, produtoModel;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            produtoModel = new ProdutoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await produtoModel.excluirProduto({ id_produto: req.params.id });

            res.status(200).json({
                "tipo": 'success',
                "message": 'Produto excluido com sucesso. <br>'
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

    application.get('/listar/saldo/produtos', async (req, res) => {
        let connection, produtoModel, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            produtoModel = new ProdutoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await produtoModel.getSaldoProdutos({
                "reserva_estoque": req.session.reserva
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

    application.patch('/alterar/estoque/produto', async (req, res) => {
        let connection, produtoModel;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            produtoModel = new ProdutoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await produtoModel.alterarEstoqueProduto(req.body);

            res.status(200).json({
                "tipo": 'success',
                "message": 'Estoque do produto alterado com sucesso. <br>'
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

    application.get('/busca/dados/produto/:id', async (req, res) => {
        let connection, produtoModel, embalagens = [], produto = {};
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            produtoModel = new ProdutoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            let dadosProduto = await produtoModel.getDadosProduto({
                "idProduto": req.params.id,
                "reserva_estoque": req.session.reserva
            });

            embalagens.push(dadosProduto.map((data) => {
                return {
                    id: data.ID_EMBALAGEM,
                    sigla: data.SIGLA,
                    quantidade: data.QUANTIDADE
                }
            }))

            produto = {
                valor: dadosProduto[0].PRECO,
                saldo: dadosProduto[0].SALDO_ESTOQUE,
                id: dadosProduto[0].ID_PRODUTO
            }

            res.status(200).json({
                "tipo": 'success',
                "dataProduto": produto,
                "dataEmbalagem": embalagens[0]
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

    application.get('/listar/produtos/baixo/margem', async(req, res) => {
        let connection, produtoModel, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            produtoModel = new ProdutoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await produtoModel.getProdutosAbaixoMargemSeguranca({
                "reserva_estoque": req.session.reserva
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