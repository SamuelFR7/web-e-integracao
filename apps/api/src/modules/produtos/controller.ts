import type { Request, Response } from "express"
import { z } from "zod"
import { db } from "~/db/db"
import { produtos } from "~/db/schema"

const cadastrarProdutoSchema = z.object({
  codigo: z.string().toUpperCase(),
  nome: z.string().toUpperCase(),
  tamanho: z.enum(["P", "M", "G"]),
  categoriaId: z.number(),
  preco: z.number().int().positive()
})

async function cadastrarProduto(req: Request, res: Response) {
  const data = cadastrarProdutoSchema.parse(req.body)

  await db.insert(produtos).values(data)

  res.status(201).json({ message: "Produto cadastrado com sucesso" })
  return
}

export default {
  cadastrarProduto,
}
