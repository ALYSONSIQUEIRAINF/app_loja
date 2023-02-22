class Fornecedor {
    constructor(fornecedor) {
        this.id_fornecedor = fornecedor.id_fornecedor;
        this.nome_fantasia = fornecedor.nome_fantasia.trim().toUpperCase();
        this.razao_social = fornecedor.razao_social ? fornecedor.razao_social.trim().toUpperCase() : '';
        this.nome_contato = fornecedor.nome_contato ? fornecedor.nome_contato.trim().toUpperCase() : '';
        this.email_contato = fornecedor.email_contato ? fornecedor.email_contato.trim().toLowerCase() : '';
        this.cnpj = fornecedor.cnpj ? fornecedor.cnpj.trim().toLowerCase() : '';
        this.telefone_contato1 = fornecedor.telefone_contato1 ? fornecedor.telefone_contato1.trim().toUpperCase() : '';
        this.telefone_contato2 = fornecedor.telefone_contato2 ? fornecedor.telefone_contato2.trim().toUpperCase() : '';
    }
}
module.exports = Fornecedor;