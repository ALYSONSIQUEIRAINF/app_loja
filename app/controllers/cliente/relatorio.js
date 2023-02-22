require('dotenv').config({
    path: '../../.env'
});

const ProdutoDAO = require('../../models/dao/ProdutoDAO');
const mysql = require('mysql');

module.exports = function (application) {

    application.get('/gerar/relatorio/produto/:tipo/:data', async(req, res) => {
        let connection, produtoModel, records, draw = req.query.draw || 1;
        try {
            const params = {

            } = req.params

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

            if(params.tipo == 1){ //Produtos abaixo da margem.
                records = await produtoModel.getProdutosAbaixoMargemSeguranca({
                    "reserva_estoque": req.session.reserva
                });
            } else if (params.tipo == 2) { //Produtos vendidos nos últimos..
                let dataAtual = new Date();
                new Date(dataAtual.setHours(0, 0, 0, 0));
                let dataPesquisa = new Date(dataAtual.setDate(dataAtual.getDate() - params.data));

                records = await produtoModel.getBetweenProdutosMaisVendidos({
                    "reserva_estoque": req.session.reserva,
                    "data": dataPesquisa.toISOString().substring(0, 10) + ' 00:00:00'
                });
            } else if (params.tipo == 4) { //Fabricante especifico.
                records = await produtoModel.getProdutosFabricante({
                    "reserva_estoque": req.session.reserva,
                    "fabricante": params.data
                });
            } else if (params.tipo == 5) { //Fornecedor especifico.
                records = await produtoModel.getProdutosFornecedor({
                    "reserva_estoque": req.session.reserva,
                    "fornecedor": params.data
                });
            } else { //Todos.
                records = await produtoModel.getProdutos({
                    "reserva_estoque": req.session.reserva
                });
            }

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