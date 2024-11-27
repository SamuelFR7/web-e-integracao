import express from "express"
import relatoriosController from "./controller"
import { ensureAuthMiddleware } from "../auth/middleware"

const relatoriosRouter = express.Router()

relatoriosRouter.use(ensureAuthMiddleware)
relatoriosRouter.get("/relatorios/pedidos/xlsx", relatoriosController.excelPedidos)
relatoriosRouter.get("/relatorios/pedidos/dashboard", relatoriosController.dashboardPedidos)

export default relatoriosRouter 
