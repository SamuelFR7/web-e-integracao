import { eq } from "drizzle-orm"
import type { Request, Response } from "express"
import { db } from "~/db/db"
import { categorias } from "~/db/schema"
import { paramsSchema } from "~/shared/schemas"
import { createCategoriaSchema, updateCategoriaSchema } from "./dtos"

async function cadastrarCategoria(req: Request, res: Response) {
  const data = createCategoriaSchema.parse(req.body)

  await db.insert(categorias).values(data)

  res.status(201).json({ message: "Categoria cadastrada com sucesso" })
  return
}

async function listarCategorias(_: Request, res: Response) {
  const categorias = await db.query.categorias.findMany()

  res.status(200).json(categorias)
  return
}

async function mostrarCategoria(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params)

  const categoria = await db.query.categorias.findFirst({
    where: (categorias, { eq }) => eq(categorias.id, id),
  })

  if (!categoria) {
    res.status(404).send({ message: "Categoria não encontrada" })
    return
  }

  res.status(200).json(categoria)
  return
}

async function atualizarCategoria(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params)

  const categoria = await db.query.categorias.findFirst({
    where: (categorias, { eq }) => eq(categorias.id, id),
  })

  if (!categoria) {
    res.status(404).send({ message: "Categoria não encontrada" })
    return
  }

  const data = updateCategoriaSchema.parse(req.body)

  await db.update(categorias).set(data).where(eq(categorias.id, id))

  res.status(200).json({ message: "Categoria atualizada com sucesso" })
  return
}

async function deletarCategoria(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params)

  const categoria = await db.query.categorias.findFirst({
    where: (categorias, { eq }) => eq(categorias.id, id),
  })

  if (!categoria) {
    res.status(404).send({ message: "Categoria não encontrada" })
    return
  }

  await db.delete(categorias).where(eq(categorias.id, id))

  res.status(200).json({ message: "Categoria deletada com sucesso" })
  return
}

export default {
  cadastrarCategoria,
  listarCategorias,
  mostrarCategoria,
  atualizarCategoria,
  deletarCategoria,
}
