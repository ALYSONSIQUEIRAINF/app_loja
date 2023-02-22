class ClienteDAO {
    constructor(connection) {
        this._connection = connection;
    }

    getClientes(binds = []) {
        return new Promise((resolve, reject) => {
            this._connection.query(`SELECT ID_CLIENTE,RAZAO_SOCIAL,CNPJ,ENDERECO,BAIRRO,CIDADE,ESTADO,CEP,NUMERO_RESIDENCIA,TELEFONE_CONTATO1,TELEFONE_CONTATO2,CONTA,CONNECTION,CASE WHEN SITUACAO = 'A' THEN 'ATIVO' ELSE 'INATIVO' END AS SITUACAO_DESC,SITUACAO,CASE WHEN RESERVA_ESTOQUE = 'S' THEN 'SIM' ELSE 'NÃO' END AS RESERVA_ESTOQUE_DESC,RESERVA_ESTOQUE FROM CLIENTES`, binds,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "ClienteDAO.getClientes",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    postCliente(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.razao_social,
                binds.cnpj,
                binds.endereco,
                binds.bairro,
                binds.cidade,
                binds.estado,
                binds.cep,
                binds.numero_residencia,
                binds.telefone_contato1,
                binds.telefone_contato2,
                binds.conta,
                binds.connection,
                binds.situacao,
                binds.reserva_estoque
            ];

            this._connection.query(`INSERT INTO CLIENTES(RAZAO_SOCIAL,CNPJ,ENDERECO,BAIRRO,CIDADE,ESTADO,CEP,NUMERO_RESIDENCIA,TELEFONE_CONTATO1,TELEFONE_CONTATO2,CONTA,CONNECTION,SITUACAO,RESERVA_ESTOQUE)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            `, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "ClienteDAO.postCliente",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    updateCliente(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.razao_social,
                binds.endereco,
                binds.bairro,
                binds.cidade,
                binds.estado,
                binds.cep,
                binds.numero_residencia,
                binds.telefone_contato1,
                binds.telefone_contato2,
                binds.conta,
                binds.connection,
                binds.situacao,
                binds.reserva_estoque,
                binds.id_cliente,
            ];

            this._connection.query(`UPDATE CLIENTES 
                SET RAZAO_SOCIAL = ?, 
                    ENDERECO = ?,
                    BAIRRO = ?,
                    CIDADE = ?,
                    ESTADO = ?,
                    CEP = ?,
                    NUMERO_RESIDENCIA = ?,
                    TELEFONE_CONTATO1 = ?,
                    TELEFONE_CONTATO2 = ?,
                    CONTA = ?,
                    CONNECTION = ?,
                    SITUACAO = ?,
                    RESERVA_ESTOQUE = ?
                WHERE ID_CLIENTE = ?
            `, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "ClienteDAO.updateCliente",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    deleteCliente(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.id_cliente
            ];

            this._connection.query(`DELETE CLIENTES WHERE ID_CLIENTE = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "ClienteDAO.deleteCliente",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }
}

module.exports = ClienteDAO;