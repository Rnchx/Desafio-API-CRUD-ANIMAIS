import { Router } from "express";
import rotasAnimais from "./animais.routes.js";

export const rotas = Router();

rotas.use("/animais", rotasAnimais)

export default rotas