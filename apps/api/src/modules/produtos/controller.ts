import { eq } from "drizzle-orm"
import type { Request, Response } from "express"
import { z } from "zod"
import { db } from "~/db/db"
import { produtos } from "~/db/schema"
import { paramsSchema } from "~/shared/schemas"
import { createProdutoSchema, updateProdutoSchema } from "./dtos"

async function cadastrarProduto(req: Request, res: Response) {
  const data = createProdutoSchema.parse(req.body)

  await db.insert(produtos).values(data)

  res.status(201).json({ message: "Produto cadastrado com sucesso" })
  return
}

async function listarProduto(_: Request, res: Response) {
  const produtos = await db.query.produtos.findMany()

  res.status(200).json(produtos)
}

async function mostrarProduto(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params)

  const produto = await db.query.produtos.findFirst({
    where: (produtos, { eq }) => eq(produtos.id, id),
  })

  if (!produto) {
    res.status(404).json({ message: "Produto não encontrado" })
  }

  res.status(200).json(produto)
  return
}

async function atualizarProduto(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params)

  const data = updateProdutoSchema.parse(req.body)

  await db.update(produtos).set(data).where(eq(produtos.id, id))

  res.status(200).json({ message: "Produto atualizado com sucesso" })
  return
}

async function deletarProduto(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params)

  await db.delete(produtos).where(eq(produtos.id, id))

  res.status(200).json({ message: "Produto deletado com sucesso" })
  return
}

export default {
  cadastrarProduto,
  listarProduto,
  atualizarProduto,
  mostrarProduto,
  deletarProduto,
}
