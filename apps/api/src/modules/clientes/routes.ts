import express from "express"
import clientesController from "./controller"
import { ensureAuthMiddleware } from "../auth/middleware"

const clientesRouter = express.Router()

clientesRouter.use(ensureAuthMiddleware)
clientesRouter.post("/clientes", clientesController.cadastrarCliente)
clientesRouter.get("/clientes", clientesController.listarClientes)
clientesRouter.get("/clientes/:id", clientesController.mostrarCliente)
clientesRouter.patch("/clientes/:id", clientesController.atualizarCliente)
clientesRouter.delete("/clientes/:id", clientesController.excluirCliente)

export default clientesRouter
