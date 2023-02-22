class FabricanteDAO {
    constructor(connection) {
        this._connection = connection;
    }

    getFabricantes(binds = []) {
        return new Promise((resolve, reject) => {
            this._connection.query(`SELECT ID_FABRICANTE,NOME FROM FABRICANTES`, binds,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "FabricanteDAO.getFabricantes",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    postFabricante(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.nome
            ];

            this._connection.query(`INSERT INTO FABRICANTES(NOME) VALUES (?)`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "FabricanteDAO.postFabricante",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    alterarFabricante(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.nome,
                binds.id_fabricante
            ];

            this._connection.query(`UPDATE FABRICANTES SET NOME = ? WHERE ID_FABRICANTE = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "FabricanteDAO.alterarFabricante",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    excluirFabricante(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.id_fabricante
            ];

            this._connection.query(`DELETE FROM FABRICANTES WHERE ID_FABRICANTE = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "FabricanteDAO.excluirFabricante",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }
}

module.exports = FabricanteDAO;