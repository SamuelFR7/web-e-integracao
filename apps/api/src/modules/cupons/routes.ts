import express from "express"
import cuponsController from "./controller"
import { ensureAuthMiddleware } from "../auth/middleware"

const cuponsRouter = express.Router()

cuponsRouter.use(ensureAuthMiddleware)
cuponsRouter.post("/cupons", cuponsController.cadastrarCupom)
cuponsRouter.get("/cupons", cuponsController.listarCupons)
cuponsRouter.get("/cupons/:id", cuponsController.mostrarCupom)
cuponsRouter.patch("/cupons/:id", cuponsController.atualizarCupom)
cuponsRouter.delete("/cupons/:id", cuponsController.deletarCupom)

export default cuponsRouter
