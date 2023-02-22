class Pedido {
    constructor(pedido) {
        this.usuario_id = pedido.usuario_id;
        this.razao_social = pedido.razao_social;
        this.cnpj = pedido.cnpj;
        this.rascunho = pedido.rascunho;
        this.valor_total = pedido.valor_total;
        this.id_pedido = pedido.id_pedido;
    }
}
module.exports = Pedido;