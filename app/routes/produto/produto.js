require('dotenv').config({
    path: '../../../.env'
});

const mysql = require('mysql');
const CategoriaDAO = require('../../models/dao/CategoriaDAO');
const EmbalagemDAO = require('../../models/dao/EmbalagemDAO');
const FabricanteDAO = require('../../models/dao/FabricanteDAO');
const FornecedorDAO = require('../../models/dao/FornecedorDAO');

module.exports = function (application) {
    let version = require('../../../package').version;
    let app_name = require('../../../package').app_name;
    let copyright = require('../../../package').copyright;

    application.get('/cadastrar/produto', async (req, res) => {
        let connection, categoriaModel, embalagemModel, fabricanteModel, fornecedorModel;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            categoriaModel = new CategoriaDAO(connection);
            embalagemModel = new EmbalagemDAO(connection);
            fabricanteModel = new FabricanteDAO(connection);
            fornecedorModel = new FornecedorDAO(connection);

            recordsCategorias = await categoriaModel.getCategorias();
            recordsEmbalagens = await embalagemModel.getEmbalagens();
            recordsFabricantes = await fabricanteModel.getFabricantes();
            recordsFornecedores = await fornecedorModel.getFornecedores();

            res.render("produto/cadastro", {
                "version": version,
                "app_name": app_name,
                "copyright": copyright,
                "tipo": req.session.tipo,
                "recordsCategorias": recordsCategorias,
                "recordsEmbalagens": recordsEmbalagens,
                "recordsFabricantes": recordsFabricantes,
                "recordsFornecedores": recordsFornecedores
            });
        } catch (error) {
            res.render("produto/cadastro", {
                "version": version,
                "app_name": app_name,
                "copyright": copyright,
                "tipo": req.session.tipo,
                "recordsCategorias": [],
                "recordsEmbalagens": [],
                "recordsFabricantes": [],
                "recordsFornecedores": []
            });
        }

    });

    application.get('/alterar/produto', async (req, res) => {
        let connection, categoriaModel, embalagemModel, fabricanteModel, fornecedorModel;
        try {
            connection = await mysql.createConnection({
                host: process.env.mysql_server,
                user: process.env.mysql_user,
                password: process.env.mysql_password,
                database: req.session.conta
            });

            categoriaModel = new CategoriaDAO(connection);
            embalagemModel = new EmbalagemDAO(connection);
            fabricanteModel = new FabricanteDAO(connection);
            fornecedorModel = new FornecedorDAO(connection);

            recordsCategorias = await categoriaModel.getCategorias();
            recordsEmbalagens = await embalagemModel.getEmbalagens();
            recordsFabricantes = await fabricanteModel.getFabricantes();
            recordsFornecedores = await fornecedorModel.getFornecedores();

            res.render("produto/altera", {
                "version": version,
                "app_name": app_name,
                "copyright": copyright,
                "tipo": req.session.tipo,
                "recordsCategorias": recordsCategorias,
                "recordsEmbalagens": recordsEmbalagens,
                "recordsFabricantes": recordsFabricantes,
                "recordsFornecedores": recordsFornecedores
            });
        } catch (error) {
            res.render("produto/altera", {
                "version": version,
                "app_name": app_name,
                "copyright": copyright,
                "tipo": req.session.tipo,
                "recordsCategorias": [],
                "recordsEmbalagens": [],
                "recordsFabricantes": [],
                "recordsFornecedores": []
            });
        }
    });

    application.get('/alterar/estoque', async (req, res) => {
        res.render("produto/estoque", {
            "version": version,
            "app_name": app_name,
            "copyright": copyright,
            "tipo": req.session.tipo
        });
    });
};