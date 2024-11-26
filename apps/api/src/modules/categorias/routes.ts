import express from "express"
import categoriasController from "./controller"
import { ensureAuthMiddleware } from "../auth/middleware"

const categoriasRouter = express.Router()

categoriasRouter.use(ensureAuthMiddleware)
categoriasRouter.post("/categorias", categoriasController.cadastrarCategoria)
categoriasRouter.get("/categorias", categoriasController.listarCategorias)
categoriasRouter.get("/categorias/:id", categoriasController.mostrarCategoria)
categoriasRouter.patch(
  "/categorias/:id",
  categoriasController.atualizarCategoria
)
categoriasRouter.delete(
  "/categorias/:id",
  categoriasController.deletarCategoria
)

export default categoriasRouter
