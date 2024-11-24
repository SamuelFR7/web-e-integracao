import "dotenv/config"
import express from "express"
import cors from "cors"
import authRouter from "./modules/auth/routes"
import cookieParser from "cookie-parser"
import clientesRouter from "./modules/clientes/routes"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: (_origin, cb) => {
      cb(null, true)
    },
    credentials: true,
  })
)

app.use(authRouter)
app.use(clientesRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server is running on port 3000")
})
