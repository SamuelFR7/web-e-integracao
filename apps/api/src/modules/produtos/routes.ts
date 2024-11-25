import express from "express"
import produtosController from "./controller"
import { ensureAuthMiddleware } from "../auth/middleware"

const produtosRouter = express.Router()

produtosRouter.use(ensureAuthMiddleware)
produtosRouter.post("/produtos", produtosController.cadastrarProduto)

export default produtosRouter 
