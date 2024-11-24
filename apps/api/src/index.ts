import "dotenv/config"
import express from "express"
import cors from "cors"
import authRouter from "./modules/auth/routes"

const app = express()

app.use(express.json())
app.use(cors())

app.use(authRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server is running on port 3000")
})
