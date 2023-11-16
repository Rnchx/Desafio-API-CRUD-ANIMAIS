import { Router } from "express";
import rotasAnimais from "./animais.routes";

export const rotas = Router();

rotas.use("/animais", rotasAnimais)