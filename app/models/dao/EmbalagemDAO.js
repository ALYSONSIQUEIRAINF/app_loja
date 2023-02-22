class EmbalagemDAO {
    constructor(connection) {
        this._connection = connection;
    }

    getEmbalagens(binds = []) {
        return new Promise((resolve, reject) => {
            this._connection.query(`SELECT ID_EMBALAGEM,SIGLA,DESCRICAO,QUANTIDADE FROM EMBALAGENS`, binds,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "EmbalagemDAO.getEmbalagens",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    postEmbalagem(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.sigla,
                binds.descricao,
                binds.quantidade
            ];

            this._connection.query(`INSERT INTO EMBALAGENS(SIGLA,DESCRICAO,QUANTIDADE) VALUES (?,?,?)`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "EmbalagemDAO.postEmbalagem",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    alterarEmbalagem(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.sigla,
                binds.descricao,
                binds.quantidade,
                binds.id_embalagem
            ];

            this._connection.query(`UPDATE EMBALAGENS SET SIGLA = ?, DESCRICAO = ?, QUANTIDADE = ? WHERE ID_EMBALAGEM = ? `, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "EmbalagemDAO.alterarEmbalagem",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    excluirEmbalagem(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.id_embalagem
            ];

            this._connection.query(`DELETE FROM EMBALAGENS WHERE ID_EMBALAGEM = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "EmbalagemDAO.excluirEmbalagem",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }
}

module.exports = EmbalagemDAO;