import type { Request, Response } from "express"
import { z } from "zod"
import { db } from "~/db/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const signInSchema = z.object({
  email: z.string().email(),
  senha: z.string(),
})

async function signIn(req: Request, res: Response) {
  const { email, senha } = signInSchema.parse(req.body)

  const userExists = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  })

  if (!userExists) {
    res.status(401).json({ message: "Usuário não encontrado" })
    return
  }

  const passwordMatch = await bcrypt.compare(senha, userExists.senha)

  if (!passwordMatch) {
    res.status(401).json({ message: "Senha inválida" })
    return
  }

  const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  })

  res.json({ token })
}

export default {
  signIn,
}
