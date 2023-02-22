class FornecedorDAO {
    constructor(connection) {
        this._connection = connection;
    }

    getFornecedores(binds = []) {
        return new Promise((resolve, reject) => {
            this._connection.query(`SELECT ID_FORNECEDOR,NOME_FANTASIA,RAZAO_SOCIAL,NOME_CONTATO,EMAIL_CONTATO,EMAIL_CONTATO,CNPJ,TELEFONE_CONTATO1,TELEFONE_CONTATO2 FROM FORNECEDORES`, binds,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "FornecedorDAO.getFornecedores",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    postFornecedor(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.nome_fantasia,
                binds.razao_social,
                binds.nome_contato,
                binds.email_contato,
                binds.cnpj,
                binds.telefone_contato1,
                binds.telefone_contato2
            ];

            this._connection.query(`INSERT INTO FORNECEDORES(NOME_FANTASIA,RAZAO_SOCIAL,NOME_CONTATO,EMAIL_CONTATO,CNPJ,TELEFONE_CONTATO1,TELEFONE_CONTATO2) VALUES (?,?,?,?,?,?,?)`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "FornecedorDAO.postFornecedor",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    alterarFornecedor(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.nome_fantasia,
                binds.razao_social,
                binds.nome_contato,
                binds.email_contato,
                binds.cnpj,
                binds.telefone_contato1,
                binds.telefone_contato2,
                binds.id_fornecedor
            ];

            this._connection.query(`UPDATE FORNECEDORES SET NOME_FANTASIA = ?, RAZAO_SOCIAL = ?, NOME_CONTATO = ?, EMAIL_CONTATO = ?, CNPJ = ?, TELEFONE_CONTATO1 = ?, TELEFONE_CONTATO2 = ? WHERE ID_FORNECEDOR = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "FornecedorDAO.alterarFornecedor",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    excluirFornecedor(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.id_fornecedor
            ];

            this._connection.query(`DELETE FROM FORNECEDORES WHERE ID_FORNECEDOR = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "FornecedorDAO.excluirFornecedor",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }
}

module.exports = FornecedorDAO;