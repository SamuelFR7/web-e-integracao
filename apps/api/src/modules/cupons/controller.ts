import { eq } from "drizzle-orm"
import type { Request, Response } from "express"
import { db } from "~/db/db"
import { cupons } from "~/db/schema"
import { paramsSchema } from "~/shared/schemas"
import { createCupomSchema, updateCupomSchema } from "./dtos"

async function cadastrarCupom(req: Request, res: Response) {
  const data = createCupomSchema.parse(req.body)

  await db.insert(cupons).values(data)

  res.status(201).json({ message: "Cupom cadastrada com sucesso" })
  return
}

async function listarCupons(_: Request, res: Response) {
  const cupons = await db.query.cupons.findMany()

  res.status(200).json(cupons)
  return
}

async function mostrarCupom(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params)

  const cupom = await db.query.cupons.findFirst({
    where: (cupons, { eq }) => eq(cupons.id, id),
  })

  if (!cupom) {
    res.status(401).json({ message: "Cupom não encontrado" })
    return
  }

  res.status(200).json(cupom)
  return
}

async function atualizarCupom(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params)

  const cupom = await db.query.cupons.findFirst({
    where: (cupons, { eq }) => eq(cupons.id, id),
  })

  if (!cupom) {
    res.status(401).json({ message: "Cupom não encontrado" })
    return
  }

  const data = updateCupomSchema.parse(req.body)

  await db.update(cupons).set(data).where(eq(cupons.id, id))

  res.status(200).json({ message: "Cupom atualizado com sucesso" })
  return
}

async function deletarCupom(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params)

  const cupom = await db.query.cupons.findFirst({
    where: (cupons, { eq }) => eq(cupons.id, id),
  })

  if (!cupom) {
    res.status(401).json({ message: "Cupom não encontrado" })
    return
  }

  await db.delete(cupons).where(eq(cupons.id, id))

  res.status(200).json({ message: "Cupom deletado com sucesso" })
  return
}

export default {
  cadastrarCupom,
  listarCupons,
  mostrarCupom,
  atualizarCupom,
  deletarCupom,
}
