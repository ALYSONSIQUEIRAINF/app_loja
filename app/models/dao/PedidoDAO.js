class PedidoDAO {
    constructor(connection) {
        this._connection = connection;
    }

    getRascunho(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.id_usuario
            ];
            this._connection.query(`SELECT ID_PEDIDO FROM PEDIDOS WHERE RASCUNHO = 'S' AND ID_USUARIO = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "PedidoDAO.getRascunho",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    postPedido(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.usuario_id,
                binds.razao_social,
                binds.cnpj,
                new Date(),
                binds.rascunho
            ];

            this._connection.query(`INSERT INTO PEDIDOS(ID_USUARIO,RAZAO_SOCIAL,CNPJ,DATA_PEDIDO,RASCUNHO) VALUES (?,?,?,?,?)`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "PedidoDAO.postPedido",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    buscaUltimoRegistroInserido() {
        return new Promise((resolve, reject) => {
            this._connection.query("SELECT LAST_INSERT_ID() ID_PEDIDO", [], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            })
        })
    }

    buscaDadosPedidoRascunho(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.usuario_id,
                binds.pedido_id
            ];

            this._connection.query(`
            SELECT ID_PEDIDO,B.PRODUTO_ID,
                   CONCAT(C.DESCRICAO, ' - ',C.DESCRICAO_COMPLEMENTAR) DESCRICAO,
                   B.VALOR_UNITARIO, 
                   B.QUANTIDADE, 
                   B.VALOR_TOTAL
            FROM PEDIDOS A
            INNER JOIN PEDIDO_ITENS B ON B.PEDIDO_ID = A.ID_PEDIDO
            INNER JOIN PRODUTOS C ON C.ID_PRODUTO = B.PRODUTO_ID
            WHERE A.ID_USUARIO = ?
              AND A.ID_PEDIDO = ? 
              AND A.RASCUNHO = 'S'`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "PedidoDAO.buscaDadosPedidoRascunho",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    excluirRascunho(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.id_pedido
            ];

            this._connection.query(`DELETE FROM PEDIDOS WHERE ID_PEDIDO = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "PedidoDAO.excluirRascunho",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    fechaPedido(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.razao_social,
                binds.cnpj,
                binds.rascunho,
                binds.valor_total,
                binds.id_pedido
            ];

            this._connection.query(`UPDATE PEDIDOS SET RAZAO_SOCIAL = ?, CNPJ = ?, RASCUNHO = ?, VALOR_TOTAL = ? WHERE ID_PEDIDO = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "PedidoDAO.fechaPedido",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    buscaPedidosBetween(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.data_inicio,
                binds.data_fim
            ];
            this._connection.query(`
            SELECT ID_PEDIDO,
                   RAZAO_SOCIAL,
                   CNPJ,
                   DATA_PEDIDO,
                   VALOR_TOTAL,
                   VALOR_TOTAL_DESCONTO 
            FROM PEDIDOS 
            WHERE RASCUNHO = 'N' AND DATA_PEDIDO BETWEEN ? AND ? ORDER BY DATA_PEDIDO`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "PedidoDAO.buscaPedidosBetween",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    buscaDadosPedido(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.pedido_id
            ];

            this._connection.query(`
            SELECT CONCAT(C.DESCRICAO, ' - ',C.DESCRICAO_COMPLEMENTAR) DESCRICAO,
                   C.PRECO,
                   B.VALOR_UNITARIO,
                   B.QUANTIDADE,
                   B.VALOR_TOTAL,
                   D.SIGLA,
                   CONCAT(E.NOME_FANTASIA, ' Tel:. ', E.TELEFONE_CONTATO1) AS NOME_FANTASIA
            FROM PEDIDOS A
                INNER JOIN PEDIDO_ITENS B ON B.PEDIDO_ID = A.ID_PEDIDO
                INNER JOIN PRODUTOS C ON C.ID_PRODUTO = B.PRODUTO_ID
                INNER JOIN EMBALAGENS D ON D.ID_EMBALAGEM = B.EMBALAGEM_ID
                INNER JOIN FORNECEDORES E ON E.ID_FORNECEDOR = C.FORNECEDOR_ID
            WHERE A.ID_PEDIDO = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "PedidoDAO.buscaDadosPedido",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }
}

module.exports = PedidoDAO;