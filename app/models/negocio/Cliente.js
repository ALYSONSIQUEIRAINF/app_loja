class Cliente {
    constructor(cliente){
        this.id_cliente = cliente.id_cliente;
        this.razao_social = cliente.razao_social.trim().toUpperCase();
        this.cnpj = cliente.cnpj.trim();
        this.endereco = cliente.endereco.trim();
        this.bairro = cliente.bairro.toUpperCase();
        this.cidade = cliente.cidade.toUpperCase();
        this.estado = cliente.estado.toUpperCase();
        this.cep = cliente.cep.trim();
        this.reserva_estoque = cliente.reserva_estoque;
        this.numero_residencia = cliente.numero_residencia.trim();
        this.telefone_contato1 = cliente.telefone_contato1.trim();
        this.telefone_contato2 = cliente.telefone_contato2 ? cliente.telefone_contato2.trim() : '';
        this.conta = cliente.conta.trim().toUpperCase();
        this.connection = cliente.connection.trim().toLowerCase();
        this.situacao = cliente.situacao;
    }
}
module.exports = Cliente;