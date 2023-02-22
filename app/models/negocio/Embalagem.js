class Embalagem {
    constructor(embalagem){
        this.id_embalagem = embalagem.id_embalagem;
        this.sigla = embalagem.sigla.trim().toUpperCase();
        this.descricao = embalagem.descricao.trim().toUpperCase();
        this.quantidade = Number(embalagem.quantidade);
    }
}
module.exports = Embalagem;