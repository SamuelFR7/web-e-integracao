import express from "express"
import categoriasController from "./controller"
import { ensureAuthMiddleware } from "../auth/middleware"

const categoriasRouter = express.Router()

categoriasRouter.use(ensureAuthMiddleware)
categoriasRouter.post("/categorias", categoriasController.cadastrarCategoria)
categoriasRouter.get('/categorias', categoriasController.listarCategorias)

export default categoriasRouter 
