import express from "express"
import authController from "./controller"

const authRouter = express.Router()

authRouter.post("/auth/sign-in", authController.signIn)
authRouter.get("/auth/me", authController.me)

export default authRouter
