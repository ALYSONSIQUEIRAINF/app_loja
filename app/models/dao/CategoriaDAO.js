class CategoriaDAO {
    constructor(connection) {
        this._connection = connection;
    }

    getCategorias(binds = []) {
        return new Promise((resolve, reject) => {
            this._connection.query(`SELECT ID_CATEGORIA,NOME,DESCRICAO FROM CATEGORIAS`, binds,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "CategoriaDAO.getCategorias",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    postCategoria(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.nome,
                binds.descricao
            ];

            this._connection.query(`INSERT INTO CATEGORIAS(NOME,DESCRICAO) VALUES (?,?)`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "CategoriaDAO.postCategoria",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    alterarCategoria(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.nome,
                binds.descricao,
                binds.id_categoria
            ];

            this._connection.query(`UPDATE CATEGORIAS SET NOME = ?, DESCRICAO = ? WHERE ID_CATEGORIA = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "CategoriaDAO.alterarCategoria",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    excluirCategoria(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.id_categoria
            ];

            this._connection.query(`DELETE FROM CATEGORIAS WHERE ID_CATEGORIA = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "CategoriaDAO.excluirCategoria",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }
}

module.exports = CategoriaDAO;