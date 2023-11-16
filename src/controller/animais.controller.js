import Animal from '../models/Animal.js'
import Animais from '../models/Animais.js'

const InstAnimas = new Animais();

const verifyImage = (url) => {
    url.match(/\.(jpeg|jpg|gif|png)$/)
}

export const buscarTodosAnimais = async (req, res) => {
    let animais = InstAnimas.getAllAnimal();
    const tipo = req.query.tipo

    console.log(tipo)


    if(tipo) {
        animais = InstAnimas.getAnimalPorTipo(tipo);
    }  else {
        animais = InstAnimas.getAllAnimal();
    }

    if (!animais) {
        return res.status(401).send({ messageError: "Não há nenhum animal cadastrado", status: "NOT FOUND" });
    }

     return res.status(200).send({ Animais: animais, Contador: animais.length, status: "OK" })
}

export const buscarAnimalPorId = (req, res) => {
    const { id } = req.params

    const animal = InstAnimas.getAnimalPorId(id);

    if (!animal) {
        return res.status(401).send({ messageError: `O Animal do id, ${id} não foi encontrado`, status: "NOT FOUND" });
    }

    return res.status(200).send({ Informações: animal, status: "OK" })
} 

export const criarAnimal = (req, res) => {
    const { nome, tipo, idade, cor, imagem, vacinado } = req.body;

    if (nome.length < 3 || nome.length > 50) {
        return res.status(401).send({ messageError: "O Nome deve conter entre 3 á 50 caracteres", status: "DID NOT PASS VERIFICATION" });
    }

    if (tipo.length > 30) {
        return res.status(401).send({ error: "O Tipo do animal deve conter no máximo 30 caracteres", status: "DID NOT PASS VERIFICATION" });
    }

    if (!(Number.isInteger(idade))) {
        return res.status(401).send({ messageError: "A idade do animal deve ser um número inteiro", status: "DID NOT PASS VERIFICATION" })
    }

    if (idade < 0) {
        return res.status(401).send({ messageError: "A idade do animal deve ser um número maior que 0", status: "DID NOT PASS VERIFICATION" })
    }

    if (cor.length > 20) {
        return res.status(401).send({ messageError: "A cor do animal deve conter no máximo 20 caracteres", status: "DID NOT PASS VERIFICATION" });
    }

    if (!verifyImage) {
        return res.status(401).send({ messageError: "Imagem inválida", status: "DID NOT PASS VERIFICATION" });
    }

    if (typeof vacinado !== "boolean") {
        return res.status(401).send({ messageError: "Coloque opções booleanas como (true) ou (false)", status: "DID NOT PASS VERIFICATION" });
    }

    if (nome == "" || tipo == "" || idade == "" || cor == "" || imagem == "") {
        return res.status(406).send({ messageError: "Preencha todos os requisitos para cadastrar um animal", status: "DID NOT PASS VERIFICATION" });
    }

    const animal = new Animal(nome, tipo, idade, cor, imagem, vacinado);

    InstAnimas.addAnimal(animal);

    res.status(201).send({ messageSucess: `${nome} foi cadastrado(a) no sistema`, informações: animal, status: "OK" });
}

export const excluirAnimal = (req, res) => {
    const { id } = req.params;
    const animal = InstAnimas.getAnimalPorId(id);

    console.log(animal);

    if (!animal) {
        return res.status(401).send({ messageSucess: `Animal do id ${id} não encontrado no sistema`, status: "DID NOT PASS VERIFICATION" });
    }

    InstAnimas.excluirAnimal(id);

    res.status(200).send({ messageSucess: `${animal.nome} do id ${id} foi deletado do sistema`, status: "OK" })
}

export const atualizarAnimal = (req, res) => {
    const { id } = req.params;
    const { nome, tipo, idade, cor, imagem, vacinado } = req.body;

    const animal = InstAnimas.getAnimalPorId(id);

    if (!animal) {
        res.status(404).send({ messageError: `Animal do ${id} não encontrado`, status: "DID NOT PASS VERIFICATION" })
    }

    InstAnimas.atualizarAnimal(id, nome, tipo, idade, cor, imagem, vacinado);

    res.status(200).send({ messageSucess: `${animal.nome} atualizado com sucesso`, status: "OK" })
}
