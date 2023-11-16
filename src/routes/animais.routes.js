import { Router } from "express";
import {
    buscarTodosAnimais,
    buscarAnimalPorId,
    criarAnimal,
    excluirAnimal,
    atualizarAnimal
} from "../controller/animais.controller.js";

const rotasAnimais = Router();

rotasAnimais.get("/", buscarTodosAnimais);
rotasAnimais.get("/:id", buscarAnimalPorId);
rotasAnimais.post("/", criarAnimal);
rotasAnimais.delete("/:id", excluirAnimal);
rotasAnimais.put("/:id", atualizarAnimal);

export default rotasAnimais