import { eq, sum } from "drizzle-orm"
import type { Request, Response } from "express"
import { z } from "zod"
import { db } from "~/db/db"
import {
  clientes,
  pedidos as pedidosRaw,
  produtos,
  produtosPedidos,
} from "~/db/schema"

async function listarPedidos(_: Request, res: Response) {
  const pedidos = await db
    .select({
      id: pedidosRaw.id,
      status: pedidosRaw.status,
      createdAt: pedidosRaw.createdAt,
      cliente: {
        nome: clientes.nome,
      },
      valorTotal: sum(produtos.preco),
    })
    .from(pedidosRaw)
    .leftJoin(clientes, eq(pedidosRaw.clienteId, clientes.id))
    .leftJoin(produtosPedidos, eq(pedidosRaw.id, produtosPedidos.pedidoId))
    .leftJoin(produtos, eq(produtosPedidos.produtoId, produtos.id))
    .groupBy(pedidosRaw.id,pedidosRaw.status, pedidosRaw.createdAt,clientes.nome)
  

  res.status(200).json({ pedidos })
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

  res.status(200).json({ pedido })
  return
}

export default {
  listarPedidos,
  detalharPedido,
}
