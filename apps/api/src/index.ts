import "dotenv/config"
import "express-async-errors"
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ZodError } from "zod"

import clientesRouter from "./modules/clientes/routes"
import authRouter from "./modules/auth/routes"
import categoriasRouter from "./modules/categorias/routes"
import produtosRouter from "./modules/produtos/routes"
import cuponsRouter from "./modules/cupons/routes"
import pedidosRouter from "./modules/pedidos/routes"
import relatoriosRouter from "./modules/relatorios/routes"
import path from "node:path"

const __dirname = new URL(".", import.meta.url).pathname

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
app.use(categoriasRouter)
app.use(produtosRouter)
app.use(cuponsRouter)
app.use(pedidosRouter)
app.use(relatoriosRouter)
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")))

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log("chegou aqui pelo menos")
  if (err instanceof ZodError) {
    res.status(422).json({
      message: "Erro de validação",
      issues: err.format(),
    })
    return
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(err)
  } else {
    // Capturar erro no Sentry
  }

  res.status(500).json({ message: "Interal server error" })
  return
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server is running on port 3000")
})
