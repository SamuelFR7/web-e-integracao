import { eq, sql, sum } from "drizzle-orm"
import type { Request, Response } from "express"
import { z } from "zod"
import { db } from "~/db/db"
import {
  clientes,
  pedidos,
  pedidos as pedidosRaw,
  produtos,
  produtosPedidos,
} from "~/db/schema"
import { createPedidoSchema } from "./dtos"
import { paramsSchema } from "~/shared/schemas"

async function listarPedidos(_: Request, res: Response) {
  const pedidos = await db
    .select({
      id: pedidosRaw.id,
      status: pedidosRaw.status,
      createdAt: pedidosRaw.createdAt,
      cliente: {
        nome: clientes.nome,
      },
      valorTotal: sum(
        sql`${produtos.preco} * ${produtosPedidos.quantidade}`.mapWith(Number)
      ).mapWith(Number),
    })
    .from(pedidosRaw)
    .leftJoin(clientes, eq(pedidosRaw.clienteId, clientes.id))
    .leftJoin(produtosPedidos, eq(pedidosRaw.id, produtosPedidos.pedidoId))
    .leftJoin(produtos, eq(produtosPedidos.produtoId, produtos.id))
    .groupBy(
      pedidosRaw.id,
      pedidosRaw.status,
      pedidosRaw.createdAt,
      clientes.nome
    )

  res.status(200).json(pedidos)
  return
}

async function detalharPedido(req: Request, res: Response) {
  const { id } = z.object({ id: z.coerce.number() }).parse(req.params)

  const pedido = await db.query.pedidos.findFirst({
    where: (pedidos, { eq }) => eq(pedidos.id, id),
    with: {
      cliente: {
        columns: {
          nome: true,
          cpf: true,
        },
      },
      produtosPedidos: {
        with: {
          produto: {
            columns: {
              nome: true,
              preco: true,
            },
          },
        },
      },
    },
  })

  if (!pedido) {
    res.status(404).json({ message: "Pedido não encontrado" })
    return
  }

  res.status(200).json(pedido)
  return
}

async function criarPedido(req: Request, res: Response) {
  const data = createPedidoSchema.parse(req.body)

  await db.transaction(async (tx) => {
    const [pedido] = await tx
      .insert(pedidos)
      .values(data)
      .returning({ id: pedidos.id })

    if (!pedido) {
      return tx.rollback()
    }

    await tx.insert(produtosPedidos).values(
      data.produtos.map((produto) => {
        return {
          pedidoId: pedido.id,
          produtoId: produto.produtoId,
          quantidade: produto.quantidade,
        }
      })
    )
  })

  res.status(201).send({ message: "Pedido criado com sucesso" })
  return
}

async function atualizarStatusPedido(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params)

  const pedido = await db.query.pedidos.findFirst({
    where: (pedidos, { eq }) => eq(pedidos.id, id),
  })

  if (!pedido) {
    res.status(404).json({ message: "Pedido não encontrado" })
    return
  }

  const data = z
    .object({
      status: z.enum([
        "Pendente",
        "Recebido",
        "Em preparo",
        "Entregador a caminho",
        "Entregue",
        "Cancelado",
      ]),
    })
    .parse(req.body)

  await db.update(pedidos).set(data).where(eq(pedidos.id, id))

  res.status(200).json({ message: "Pedido atualizado com sucesso" })
  return
}

export default {
  listarPedidos,
  detalharPedido,
  criarPedido,
  atualizarStatusPedido,
}
