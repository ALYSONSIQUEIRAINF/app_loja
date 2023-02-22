class Fabricante {
    constructor(fabricante){
        this.id_fabricante = fabricante.id_fabricante;
        this.nome = fabricante.nome.trim().toUpperCase();
    }
}
module.exports = Fabricante;