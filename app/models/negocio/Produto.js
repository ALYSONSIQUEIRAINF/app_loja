class Produto {
    constructor(produto){
        this.id_produto = produto.id_produto;
        this.descricao = produto.descricao.trim().toUpperCase();
        this.descricao_complementar = produto.descricao_complementar.trim().toUpperCase();
        this.preco = produto.preco;
        this.saldo_estoque = produto.saldo_estoque;
        this.estoque_minimo = produto.estoque_minimo;
        this.categoria_id = produto.categoria_id;
        this.fabricante_id = produto.fabricante_id;
        this.fornecedor_id = produto.fornecedor_id;
        this.situacao = produto.situacao;
    }
}
module.exports = Produto;