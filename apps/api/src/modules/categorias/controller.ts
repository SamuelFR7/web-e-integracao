import type { Request, Response } from "express"
import { z } from "zod"
import { db } from "~/db/db"
import { categorias } from "~/db/schema"

const cadastrarCategoriaSchema = z.object({
  codigo: z.string().toUpperCase(),
  nome: z.string().toUpperCase(),
})

async function cadastrarCategoria(req: Request, res: Response) {
  const data = cadastrarCategoriaSchema.parse(req.body)

  await db.insert(categorias).values(data)

  res.status(201).json({ message: "Categoria cadastrada com sucesso" })
  return
}

async function listarCategorias(_: Request, res: Response) {
  const categorias = await db.query.categorias.findMany()

  res.status(200).json({ categorias }) 
  return
}

export default {
  cadastrarCategoria,
  listarCategorias
}
