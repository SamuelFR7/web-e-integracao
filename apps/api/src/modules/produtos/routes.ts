import express from "express"
import produtosController from "./controller"
import { ensureAuthMiddleware } from "../auth/middleware"

const produtosRouter = express.Router()

produtosRouter.use(ensureAuthMiddleware)
produtosRouter.post("/produtos", produtosController.cadastrarProduto)
produtosRouter.get("/produtos", produtosController.listarProduto)
produtosRouter.get("/produtos/:id", produtosController.mostrarProduto)
produtosRouter.patch("/produtos/:id", produtosController.atualizarProduto)
produtosRouter.delete("/produtos/:id", produtosController.deletarProduto)

export default produtosRouter
