import express from "express"
import pedidosController from "./controller"
import { ensureAuthMiddleware } from "../auth/middleware"

const pedidosRouter = express.Router()

pedidosRouter.use(ensureAuthMiddleware)
pedidosRouter.get('/pedidos', pedidosController.listarPedidos)
pedidosRouter.get('/pedidos/:id', pedidosController.detalharPedido)

export default pedidosRouter 