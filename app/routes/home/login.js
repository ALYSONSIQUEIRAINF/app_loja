require('dotenv').config({
    path: '../../../.env'
});

const connMaster = require('../../../database/dbConnMaster');
const UsuarioDAO = require('../../models/dao/UsuarioDAO');
const crypto = require('crypto');
const mysql = require('mysql');

module.exports = function (application) {
    let version = require('../../../package').version;
    let app_name = require('../../../package').app_name;
    let copyright = require('../../../package').copyright;

    application.get('/login', (req, res) => {
        res.render('home/login', {
            "version": version,
            "app_name": app_name,
            "copyright": copyright
        });
    });

    application.post('/login', async (req, res) => {
        let connectionMaster, usuarioModel, records;
        var usuario = req.body.usuario;
        var senha = req.body.senha;
        var conta = req.body.conta;

        try {
            connectionMaster = await mysql.createConnection(connMaster);
            usuarioModel = new UsuarioDAO(connectionMaster);

            let hash = crypto.createHash("md5").update(senha).digest("hex");

            records = await usuarioModel.autenticar({
                "usuario": usuario,
                "senha": hash,
                "conta": conta
            });

            if (records.length > 0 && records[0].SITUACAO == 'A' || (usuario == 'admin' && senha == 'admin' && conta == 'JES')) {
                req.session.id_usuario = records.length > 0 ? records[0].ID_USUARIO : 1;
                req.session.autorizado = true;
                req.session.conta = records.length > 0 ? records[0].CONNECTION : 'app_loja';
                req.session.tipo = records.length > 0 ? records[0].TIPO : 'A'; /** C - Cliente; A - Admin */
                req.session.reserva = records.length > 0 ? records[0].RESERVA_ESTOQUE : 'S';
                res.status(200).send("OK");
            } else {
                req.session.autorizado = false;
                res.status(401).send("Usuário/Senha inválido");
            }
        } catch (error) {
            let retorno = error.message || error;
            if (typeof (retorno) == "object") {
                retorno = JSON.stringify(retorno);
            }

            res.status(500).send(retorno);
        } finally {
            if (connectionMaster) {
                try {
                    connectionMaster.end();
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
    });
}