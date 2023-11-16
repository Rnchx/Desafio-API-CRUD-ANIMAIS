class Animais {
    constructor() {
        this.ListAnimais = [];
    }

    addAnimal(animal) {
        this.ListAnimais.push(animal)
    }

    counterAnimais() {
       return this.ListAnimais.length;
    }

    getAllAnimal() {
       return this.ListAnimais;
    }

    getAnimalPorId(id) {
        return this.ListAnimais.find((animal) => animal.id === id);
    }

    getAnimalPorTipo(tipo) {
        return this.ListAnimais.filter((animal) => animal.tipo.toLowerCase() === tipo.toLowerCase());
    }

    atualizarAnimal(id, nome, tipo, idade, cor, imagem, vacinado) {
        const animal = this.getAnimalPorId(id);

        if(!animal) {
            return null;
        }

        animal.nome = nome;
        animal.tipo = tipo;
        animal.idade = idade;
        animal.cor = cor;
        animal.imagem = imagem;
        animal.vacinado = vacinado;
    }

    excluirAnimal(id) {
        this.ListAnimais = this.ListAnimais.filter(animais => animais.id !== id);
    }
}

export default Animais