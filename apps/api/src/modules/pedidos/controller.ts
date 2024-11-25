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
import xlsx from 'xlsx'
import dayjs from 'dayjs'

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

export async function exportarRelatorio(req: Request, res:Response) {
  const pedidos = await db
    .select({
      id: pedidosRaw.id,
      status: pedidosRaw.status,
      createdAt: pedidosRaw.createdAt,
      cliente: clientes.nome,
      valorTotal: sum(produtos.preco),
    })
    .from(pedidosRaw)
    .leftJoin(clientes, eq(pedidosRaw.clienteId, clientes.id))
    .leftJoin(produtosPedidos, eq(pedidosRaw.id, produtosPedidos.pedidoId))
    .leftJoin(produtos, eq(produtosPedidos.produtoId, produtos.id))
    .groupBy(pedidosRaw.id,pedidosRaw.status, pedidosRaw.createdAt,clientes.nome)

  const mappedPedidos = pedidos.map((pedido) => {
    return {
      id: pedido.id,
      status: pedido.status,
      pedidoEm: pedido.createdAt,
      cliente: pedido.cliente,
      valorTotal: pedido.valorTotal ? (Number(pedido.valorTotal) / 100) : 0
    }
  })

  const worksheet = xlsx.utils.json_to_sheet(mappedPedidos) 

  const workbook = xlsx.utils.book_new()

  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1")

  const excelBuffer = xlsx.write(workbook, { bookType: "xlsx", type: "buffer" })

  const today = dayjs().format("YYYY-MM-DD-HHmmss")

  res.setHeader('Content-Disposition', `attachment; filename="relatorio-pedidos-${today}.xlsx"`).setHeader('Content-Type', "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet").send(excelBuffer)
  return
}

export default {
  listarPedidos,
  detalharPedido,
  exportarRelatorio
}
