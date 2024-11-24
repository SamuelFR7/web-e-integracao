import express from "express"
import authController from "./controller"

const authRouter = express.Router()

authRouter.post("/auth/sign-in", authController.signIn)

export default authRouter
