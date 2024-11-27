import { db } from "~/db/db"
import {
  clientes,
  produtos,
  pedidos as pedidosRaw,
  produtosPedidos,
} from "~/db/schema"
import { sum, sql, eq } from "drizzle-orm"
import xlsx from "xlsx"
import dayjs from "dayjs"
import type { Request, Response } from "express"

async function excelPedidos(_: Request, res: Response) {
  const pedidos = await db
    .select({
      id: pedidosRaw.id,
      status: pedidosRaw.status,
      createdAt: pedidosRaw.createdAt,
      cliente: clientes.nome,
      valorTotal: sum(
        sql<number>`${produtos.preco} * ${produtosPedidos.quantidade}`
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

  const mappedPedidos = pedidos.map((pedido) => {
    return {
      id: pedido.id,
      status: pedido.status,
      pedidoEm: pedido.createdAt,
      cliente: pedido.cliente,
      valorTotal: pedido.valorTotal ? Number(pedido.valorTotal) / 100 : 0,
    }
  })

  const worksheet = xlsx.utils.json_to_sheet(mappedPedidos)

  const workbook = xlsx.utils.book_new()

  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1")

  const excelBuffer = xlsx.write(workbook, { bookType: "xlsx", type: "buffer" })

  const today = dayjs().format("YYYY-MM-DD-HHmmss")

  res
    .setHeader(
      "Content-Disposition",
      `attachment; filename="relatorio-pedidos-${today}.xlsx"`
    )
    .setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    .send(excelBuffer)
  return
}

export default {
  excelPedidos,
}