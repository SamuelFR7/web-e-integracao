import express from "express"
import cuponsController from "./controller"
import { ensureAuthMiddleware } from "../auth/middleware"

const cuponsRouter = express.Router()

cuponsRouter.use(ensureAuthMiddleware)
cuponsRouter.post("/cupons", cuponsController.cadastrarCupom)

export default cuponsRouter 
