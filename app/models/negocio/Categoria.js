class Categoria {
    constructor(categoria){
        this.id_categoria = categoria.id_categoria;
        this.nome = categoria.nome.trim().toUpperCase();
        this.descricao = categoria.descricao.trim();
    }
}
module.exports = Categoria;