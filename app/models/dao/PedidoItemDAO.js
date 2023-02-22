class PedidoItemDAO {
    constructor(connection) {
        this._connection = connection;
    }

    postItemPedido(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.pedido_id,
                binds.produto_id,
                binds.embalagem_id,
                binds.quantidade,
                binds.valor_unitario,
                binds.valor_unitario,
                binds.quantidade_embalagem,
                binds.quantidade
            ];

            this._connection.query(`
            INSERT INTO PEDIDO_ITENS(PEDIDO_ID,
                                     PRODUTO_ID,
                                     EMBALAGEM_ID,
                                     QUANTIDADE,
                                     VALOR_UNITARIO,
                                     VALOR_TOTAL)
                SELECT ?, ?, ?, ?, ?, ? * ? * ? FROM DUAL
                `, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "PedidoItemDAO.postItemPedido",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    excluirItensRascunho(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.id_pedido
            ];

            this._connection.query(`
            DELETE FROM PEDIDO_ITENS WHERE PEDIDO_ID = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "PedidoItemDAO.excluirItensRascunho",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    buscaItensPedido(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.id_pedido
            ];

            this._connection.query(`
            SELECT PRODUTO_ID,QUANTIDADE FROM PEDIDO_ITENS WHERE PEDIDO_ID = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "PedidoItemDAO.buscaItensPedido",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }
}

module.exports = PedidoItemDAO;