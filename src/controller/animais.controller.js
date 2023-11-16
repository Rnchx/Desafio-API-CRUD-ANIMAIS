import Animal from '../models/Animal.js'
import Animais from '../models/Animais.js'

const InstAnimas = new Animais();

const verifyImage = (url) => {
    url.match(/\.(jpeg|jpg|gif|png)$/)
}

export const buscarTodosAnimais = (req, res) => {
    const animais = InstAnimas.getAllAnimal();
    const contador = InstAnimas.counterAnimais();

    if(!animais, length) {
        return res.status(401).send({ messageError: "Não há nenhum animal cadastrado 🐾", status: "NOT FOUND ❌" });
    }

    return res.status(200).send({messageSucess: animais, contador: contador, status: "OK ✔"})
}

export const buscarAnimalPorId = (req, res) => {
    const { id } = req.params

    const animais = InstAnimas.getAnimalPorId(id);

    if(!animais) {
        return res.status(401).send({messageError: `O animal ${id} não foi encontrado 🙀`, status: "NOT FOUND ❌"});
    }

    return res.status(200).send({messageSucess: "Seu Animalzinho foi Cadastrado 😸", status: "OK ✔"})
}

export const criarAnimal = (req, res) => {
    const {nome, tipo, idade, cor, imagem, vacinado} = req.body;

    if(nome.length < 3 || nome.length > 50) {
        return res.status(401).send({messageError: "O Nome deve conter entre 3 á 50 caracteres 🙊", status: "DID NOT PASS VERIFICATION ❌"});
    }

    if(tipo.length > 30) {
        return res.status(401).send({error: "O Tipo do animal deve conter no máximo 30 caracteres 😿", status: "DID NOT PASS VERIFICATION ❌"});
    }

    if(Number.isInteger(idade)) {
        return res.status(401).send({messageError: "A idade do animal deve ser um número inteiro 📅", status: "DID NOT PASS VERIFICATION ❌"})
    }

    if(cor.length > 20) {
        return res.status(401).send({messageError: "A cor do animal deve conter no máximo 20 caracteres 🙊", status: "DID NOT PASS VERIFICATION ❌"});
    }

    if(vacinado != true || vacinado != false) {
        return res.status(401).send({messageError: "Coloque opções booleanas como (true) ou (false) 🦉", status: "DID NOT PASS VERIFICATION ❌"});
    }

    if(!verifyImage) {
        return res.status(401).send({messageError: "Imagem inválida 😾", status: "DID NOT PASS VERIFICATION ❌"});
    }

    const animal = new Animal(nome, tipo, idade, cor, imagem, vacinado);

    InstAnimas.addAnimal(animal);

    res.status(201).send({ animal, status: "OK ✔"});
}

export const excluirAnimal = (req, res) => {
    const { id } = req.params;
    const animal = InstAnimas.getAnimalPorId(id);

    if(!animal) {
     return res.status(401).send({messageSucess: `Animal do ${id} não encontrado 🙈`, status: "DID NOT PASS VERIFICATION ❌"});
    }

    InstAnimas.excluirAnimal(id);

    res.status(200).send({messageSucess: `Animal ${id} deletado 😿`, status: "OK ✔"})
}

export const atualizarAnimal = (req, res) => {
    const { id } = req.params;
    const { nome, tipo, idade, cor, imagem, vacinado } = req.body;

    const animal = InstAnimas.getAnimalPorId(id);

    if(!animal) {
        res.status(404).send({messageError: `Animal do ${id} não encontrado 🙈`, status: "DID NOT PASS VERIFICATION ❌"})
    }

    InstAnimas.atualizarAnimal(id, nome, tipo, idade, cor, imagem, vacinado);

    res.status(200).send({messageSucess: `Animal ${animal} atualizado com sucesso 🐱‍🏍`, status: "OK ✔"})
}
