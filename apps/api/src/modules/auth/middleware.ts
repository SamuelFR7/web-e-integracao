import type { Response, Request, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { db } from "~/db/db"

export async function ensureAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies["pizzashop_token"]

    if (!token) {
      res.status(401).send({ message: "Não autorizado" })
      return
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number
    }

    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, verified.id),
      columns: {
        email: true,
        nome: true,
        id: true,
      },
    })

    if (!user) {
      res.status(401).send({ message: "Usuário não encontrado" })
    }

    next()
  } catch (error) {
    console.log(error)
    res.status(401).send({ message: "Não autorizado" })
  }
}
