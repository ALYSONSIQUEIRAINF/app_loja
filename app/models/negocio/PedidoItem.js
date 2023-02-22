class PedidoItem {
    constructor(item) {
        this.pedido_id = item.pedido_id;
        this.produto_id = item.produto_id;
        this.embalagem_id = item.embalagem_id;
        this.quantidade = item.qtde_produto;
        this.valor_unitario = item.valor_produto;
        this.quantidade_embalagem = item.quatidade_embalagem;     
    }
}
module.exports = PedidoItem;