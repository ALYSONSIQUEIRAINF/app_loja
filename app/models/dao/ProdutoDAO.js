class ProdutoDAO {
    constructor(connection) {
        this._connection = connection;
    }

    getProdutos(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.reserva_estoque
            ];

            this._connection.query(`
            SELECT DISTINCT A.ID_PRODUTO,
                    A.DESCRICAO,
                    A.DESCRICAO_COMPLEMENTAR,
                    A.PRECO,
                    A.CATEGORIA_ID,
                    B.NOME AS NOME_CATEGORIA,
                    A.FABRICANTE_ID,
                    E.NOME AS NOME_FABRICANTE,
                    A.FORNECEDOR_ID,
                    (SELECT FDAT(A.ID_PRODUTO,?) FROM DUAL) AS SALDO_ESTOQUE,
                    CONCAT(F.NOME_FANTASIA, ' Tel:. ', F.TELEFONE_CONTATO1) AS FORNECEDOR,
                    CASE WHEN A.SITUACAO = 'A' THEN 'Ativo' ELSE 'Inativo' END AS DESC_SITUACAO,
                    A.SITUACAO
            FROM PRODUTOS A, CATEGORIAS B, PRODUTO_EMBALAGEM C, EMBALAGENS D, FABRICANTES E, FORNECEDORES F
            WHERE A.CATEGORIA_ID = B.ID_CATEGORIA AND 
            A.ID_PRODUTO = C.PRODUTO_ID AND C.EMBALAGEM_ID = D.ID_EMBALAGEM AND 
            A.FABRICANTE_ID = E.ID_FABRICANTE AND 
            A.FORNECEDOR_ID = F.ID_FORNECEDOR`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "ProdutoDAO.getProdutos",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    getProdutosResumido(binds = []) {
        return new Promise((resolve, reject) => {
            this._connection.query(`
            SELECT DISTINCT A.ID_PRODUTO,
                    CONCAT(A.DESCRICAO, ' - ', A.DESCRICAO_COMPLEMENTAR) DESCRICAO
            FROM PRODUTOS A, PRODUTO_EMBALAGEM B, EMBALAGENS C
            WHERE A.ID_PRODUTO = B.PRODUTO_ID AND B.EMBALAGEM_ID = C.ID_EMBALAGEM`, binds,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "ProdutoDAO.getProdutosResumido",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    getDadosProduto(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.reserva_estoque,
                binds.idProduto
            ];

            this._connection.query(`
            SELECT A.ID_PRODUTO,
                    A.PRECO,
                    (SELECT FDAT(A.ID_PRODUTO,?) FROM DUAL) AS SALDO_ESTOQUE,
                    C.SIGLA,
                    C.ID_EMBALAGEM,
                    C.QUANTIDADE
            FROM PRODUTOS A, PRODUTO_EMBALAGEM B, EMBALAGENS C
            WHERE A.ID_PRODUTO = B.PRODUTO_ID AND 
            B.EMBALAGEM_ID = C.ID_EMBALAGEM AND A.ID_PRODUTO = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "ProdutoDAO.getDadosProduto",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    postProduto(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.descricao,
                binds.descricao_complementar,
                binds.preco,
                binds.saldo_estoque,
                binds.estoque_minimo,
                binds.categoria_id,
                binds.fabricante_id,
                binds.fornecedor_id,
                binds.situacao
            ];

            this._connection.query(`INSERT INTO PRODUTOS(DESCRICAO,DESCRICAO_COMPLEMENTAR,PRECO,SALDO_ESTOQUE,SALDO_MINIMO,CATEGORIA_ID,FABRICANTE_ID,FORNECEDOR_ID,SITUACAO) VALUES (?,?,?,?,?,?,?,?,?)`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "ProdutoDAO.postProduto",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    buscaUltimoRegistroInserido() {
        return new Promise((resolve, reject) => {
            this._connection.query("SELECT LAST_INSERT_ID() ID_PRODUTO", [], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            })
        })
    }

    postEmbalagensProduto(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.produto_id,
                binds.embalagem_id
            ]

            this._connection.query("INSERT INTO PRODUTO_EMBALAGEM (PRODUTO_ID, EMBALAGEM_ID) VALUES (?,?)", values, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            })
        })
    }

    alterarProduto(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.descricao,
                binds.descricao_complementar,
                binds.preco,
                binds.categoria_id,
                binds.embalagem_id,
                binds.fabricante_id,
                binds.fornecedor_id,
                binds.situacao,
                binds.id_produto
            ];

            this._connection.query(`UPDATE PRODUTOS SET DESCRICAO = ?, DESCRICAO_COMPLEMENTAR = ?, PRECO = ? , CATEGORIA_ID = ?, EMBALAGEM_ID = ?, FABRICANTE_ID = ?, FORNECEDOR_ID = ?, SITUACAO = ? WHERE ID_PRODUTO = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "ProdutoDAO.alterarProduto",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    excluirProduto(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.id_produto
            ];

            this._connection.query(`DELETE FROM PRODUTOS WHERE ID_PRODUTO = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "ProdutoDAO.excluirProduto",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    getSaldoProdutos(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.reserva_estoque
            ];

            this._connection.query(`
            SELECT A.ID_PRODUTO, CONCAT(A.DESCRICAO, ' - ', A.DESCRICAO_COMPLEMENTAR) DESCRICAO, (SELECT FDAT(A.ID_PRODUTO,?) FROM DUAL) AS SALDO_ESTOQUE FROM PRODUTOS A WHERE A.SITUACAO = 'A'`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "ProdutoDAO.getSaldoProdutos",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    alterarEstoqueProduto(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.saldo_estoque,
                binds.id_produto
            ];

            this._connection.query(`UPDATE PRODUTOS SET SALDO_ESTOQUE = ? WHERE ID_PRODUTO = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "ProdutoDAO.alterarEstoqueProduto",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    abateSaldoProduto(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.quantidade,
                binds.id_produto,
                binds.id_produto
            ];

            this._connection.query(`
            UPDATE PRODUTOS SET SALDO_ESTOQUE = (SELECT SALDO_ESTOQUE - ? FROM PRODUTOS X WHERE X.ID_PRODUTO = ?) WHERE ID_PRODUTO = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "ProdutoDAO.abateSaldoProduto",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    getProdutosAbaixoMargemSeguranca(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.reserva_estoque,
                binds.reserva_estoque
            ];
            this._connection.query(`
            SELECT CONCAT(A.DESCRICAO, ' - ', A.DESCRICAO_COMPLEMENTAR) AS DESCRICAO,
                   CONCAT(B.NOME_FANTASIA, ' Tel:. ', B.TELEFONE_CONTATO1) AS FORNECEDOR,
                   A.SALDO_MINIMO,
                   (SELECT FDAT(A.ID_PRODUTO, ?)) AS SALDO,
                   '#' QTDE_VENDIDA
            FROM PRODUTOS A
            INNER JOIN FORNECEDORES B ON A.FORNECEDOR_ID = B.ID_FORNECEDOR
            WHERE (SELECT FDAT(A.ID_PRODUTO, ?)) < A.SALDO_MINIMO
            ORDER BY 1`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "ProdutoDAO.getProdutosAbaixoMargemSeguranca",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    getBetweenProdutosMaisVendidos(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.reserva_estoque,
                binds.data
            ];
            this._connection.query(`
            SELECT CONCAT(A.DESCRICAO, ' - ', A.DESCRICAO_COMPLEMENTAR) AS DESCRICAO,
                   CONCAT(B.NOME_FANTASIA, ' Tel:. ', B.TELEFONE_CONTATO1) AS FORNECEDOR,
                   A.SALDO_MINIMO,
                   (SELECT FDAT(A.ID_PRODUTO, ?)) AS SALDO,
                   COUNT(*) QTDE_VENDIDA
            FROM PRODUTOS A
            INNER JOIN FORNECEDORES B ON A.FORNECEDOR_ID = B.ID_FORNECEDOR
            INNER JOIN PEDIDO_ITENS C ON A.ID_PRODUTO = C.PRODUTO_ID
            INNER JOIN PEDIDOS D ON C.PEDIDO_ID = D.ID_PEDIDO AND D.DATA_PEDIDO >= ? AND D.RASCUNHO NOT IN ('S')
            GROUP BY CONCAT(A.DESCRICAO, ' - ', A.DESCRICAO_COMPLEMENTAR),
                     CONCAT(B.NOME_FANTASIA, ' Tel:. ', B.TELEFONE_CONTATO1),
                     A.SALDO_MINIMO
            ORDER BY QTDE_VENDIDA DESC`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "ProdutoDAO.getProdutosAbaixoMargemSeguranca",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }
}

module.exports = ProdutoDAO;