import type { Request, Response } from "express"
import { z } from "zod"
import { db } from "~/db/db"

async function listarPedidos(_: Request, res: Response) {
  const pedidos = await db.query.pedidos.findMany({
    with: {
      cliente: {
        columns: {
          nome: true,
        },
      },
    },
    columns: {
      id: true,
      status: true,
      createdAt: true
    },
  })

  res.status(200).json({ pedidos })
  return
}

async function detalharPedido(req: Request, res: Response) {
  const { id } = z.object({ id: z.coerce.number() }).parse(req.params)

  const pedido = await db.query.pedidos.findFirst({
    where: (pedidos, { eq }) => eq(pedidos.id, id),
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
