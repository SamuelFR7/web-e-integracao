import type { Request, Response } from "express"
import { z } from "zod"
import { db } from "~/db/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { signInSchema } from "./dtos"

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

  res.cookie("pizzashop_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000,
    path: "/",
  })

  res.json({ message: "Login realizado com sucesso" })
}

async function me(req: Request, res: Response) {
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

    res.json({ me: user })
  } catch (error) {
    console.log(error)
    res.status(401).send({ message: "Não autorizado" })
  }

  return
}

export default {
  signIn,
  me,
}
