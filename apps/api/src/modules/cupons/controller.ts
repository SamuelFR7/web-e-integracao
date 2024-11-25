import type { Request, Response } from "express"
import { z } from "zod"
import { db } from "~/db/db"
import { cupons } from "~/db/schema"

const cadastrarCupomSchema = z.object({
  codigo: z.string().toUpperCase(),
  valor: z.number().int().positive()
})

async function cadastrarCupom(req: Request, res: Response) {
  const data = cadastrarCupomSchema.parse(req.body)

  await db.insert(cupons).values(data)

  res.status(201).json({ message: "Cupom cadastrada com sucesso" })
  return
}

export default {
  cadastrarCupom,
}
