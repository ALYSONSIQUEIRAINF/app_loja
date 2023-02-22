const crypto = require('crypto');

class Usuario {
    constructor(usuario){
        this.id_usuario = usuario.id_usuario;
        this.nome = usuario.nome.toUpperCase();
        this.usuario = usuario.usuario.toLowerCase().trim();
        this.senha = usuario.senha ? crypto.createHash("md5").update(usuario.senha.trim()).digest("hex") : '';
        this.email = usuario.email.toUpperCase();
        this.situacao = usuario.situacao;
        this.tipo = usuario.tipo;
        this.cliente = usuario.cliente;
    }
}
module.exports = Usuario;