var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var helmet = require('helmet');
var createError = require('http-errors');
var MemoryStore = require('memorystore')(expressSession);
var cors = require('cors');
require('dotenv').config();

/* iniciar o objeto do express */
var app = express();

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
	res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
	res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
	app.use(cors());
	next();
});

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));
app.use('/public/toastr', express.static('./node_modules/toastr/build/'));
app.use('/public/axios', express.static('./node_modules/axios/dist/'));
app.use('/public/bootstrap', express.static('./node_modules/bootstrap-select/dist/'));
app.use('/public/select2', express.static('./node_modules/select2/'));

/* configurar o middleware body-parser */
app.use(bodyParser.json({
	limit: '10mb',
	extended: true
}));
app.use(bodyParser.urlencoded({
	limit: '10mb',
	extended: true
}));

/* configurar o middleware express-session */
app.use(expressSession({
	cookie: {
		maxAge: 4 * 60 * 60 * 1000 // Time to expire in miliseconds
	},
	store: new MemoryStore({
		checkPeriod: 4 * 60 * 60 * 1000
	}),
	secret: 'O8LSeAeRdBcnEZjlQLa1',
	resave: false,
	saveUninitialized: false
}));

/* Caso estiver logado, grava ping para manter a sessão */
app.use((req, res, next) => {
	if (req.session.autorizado == true) {
		req.session.ping = new Date();
	}
	next();
});

/* Caso estiver logado, grava ping para manter a sessão */
app.use('/routes', (req, res, next) => {
	if (!req.session.autorizado) {
		res.status(401).json({
			"tipo": "error",
			"mensagem": "Login expirado. É necessário fazer o login novamente."
		})
	} else {
		next();
	}
});

/* controle de acesso */
var isLogged = function (req, res, next) {
	if (req.session.autorizado == true) {
		next();
	} else {
		if (req.url != '/favicon.ico' && req.url != '/login' && req.url != '/register') {
			res.redirect("/login");
		} else {
			next();
		}
	}
};
app.use(isLogged);

/* configurar o middleware helmet */
app.use(helmet());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign({
		verbose: false,
		locale: 'pt-br'
	})
	.include('app/routes')
	.then('database')
	.then('app/controllers')
	.into(app);

// 404 das páginas
app.use((req, res, next) => {
	next(createError(404, 'Página inexistente'));
});

// error handler
app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('comum/error');
});

/* exportar o objeto app */
module.exports = app;