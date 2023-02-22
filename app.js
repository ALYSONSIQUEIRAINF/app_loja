/* importar as configurações do servidor */
const app = require('./config/server');
const version = require('./package.json').version;
const name = require('./package.json').name;

const porta = 8001;

app.listen(porta, () => {
  console.log(`Servidor [${name}] versão [${version}] online porta [${porta}] em ${new Date()}`);
}).on('error', (err) => console.error(err.message));