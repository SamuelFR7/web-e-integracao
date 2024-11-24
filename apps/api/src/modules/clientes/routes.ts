import express from "express"
import clientesController from "./controller"
import { ensureAuthMiddleware } from "../auth/middleware"

const clientesRouter = express.Router()

clientesRouter.use(ensureAuthMiddleware)
clientesRouter.post("/clientes", clientesController.cadastrarCliente)

export default clientesRouter
