import express from "express"
import relatoriosController from "./controller"
import { ensureAuthMiddleware } from "../auth/middleware"

const relatoriosRouter = express.Router()

relatoriosRouter.use(ensureAuthMiddleware)
relatoriosRouter.get("/relatorios/pedidos", relatoriosController.excelPedidos)

export default relatoriosRouter 
