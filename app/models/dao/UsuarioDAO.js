class UsuarioDAO {
    constructor(connection) {
        this._connection = connection;
    }

    autenticar(binds) {
        return new Promise((resolve, reject) => {
            this._connection.query(`
            SELECT A.ID_USUARIO,A.SITUACAO,A.TIPO,B.CONNECTION,B.RESERVA_ESTOQUE FROM USUARIOS A
                INNER JOIN CLIENTES B ON 
                    (A.CLIENTE_ID = B.ID_CLIENTE)
             WHERE A.USUARIO = ? AND A.SENHA = ? AND B.CONTA = UPPER(?) AND B.SITUACAO = 'A'`, [binds.usuario, binds.senha, binds.conta],
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "UsuarioDAO.autenticar",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    postUsuario(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.nome,
                binds.usuario,
                binds.senha,
                binds.email,
                binds.situacao,
                binds.tipo,
                binds.cliente];

            this._connection.query("INSERT INTO USUARIOS(NOME,USUARIO,SENHA,EMAIL,SITUACAO,TIPO,CLIENTE_ID)VALUES(?,?,?,?,?,?,?)", values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "UsuarioDAO.postUsuario",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    getUsuarios(binds = []) {
        return new Promise((resolve, reject) => {
            this._connection.query(`SELECT A.ID_USUARIO,A.NOME,A.USUARIO,A.TIPO,A.EMAIL,CASE WHEN A.SITUACAO = 'A' THEN 'ATIVO' ELSE 'INATIVO' END AS SITUACAO_DESC,A.SITUACAO,A.CLIENTE_ID,B.RAZAO_SOCIAL FROM USUARIOS A
            INNER JOIN CLIENTES B ON B.ID_CLIENTE = A.CLIENTE_ID
            `, binds,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "UsuarioDAO.getUsuarios",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    updateUsuario(binds) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE USUARIOS SET NOME = '${binds.nome}',
                              USUARIO = '${binds.usuario}',
                              ${binds.senha ? "SENHA = '" + binds.senha + "'," : ''}
                              EMAIL = '${binds.email}',
                              SITUACAO = '${binds.situacao}',
                              TIPO = '${binds.tipo}',
                              CLIENTE_ID = '${binds.cliente}'
            WHERE ID_USUARIO = ${binds.id_usuario}`;

            this._connection.query(sql, [],
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "ClienteDAO.updateUsuario",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }
}

module.exports = UsuarioDAO;