import { eq } from "drizzle-orm"
import type { Request, Response } from "express"
import { db } from "~/db/db"
import { clientes } from "~/db/schema"
import { paramsSchema } from "~/shared/schemas"
import { createClienteSchema, updateClienteSchema } from "./dtos"

async function cadastrarCliente(req: Request, res: Response) {
  const data = createClienteSchema.parse(req.body)

  await db.insert(clientes).values({ ...data })

  res.status(201).json({ message: "Cliente cadastrado com sucesso" })
  return
}

async function listarClientes(_: Request, res: Response) {
  const clientes = await db.query.clientes.findMany()

  res.status(200).json(clientes)
  return
}

async function mostrarCliente(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params)

  const cliente = await db.query.clientes.findFirst({
    where: (clientes, { eq }) => eq(clientes.id, id),
  })

  if (!cliente) {
    res.status(401).json({ message: "Cliente não encontrado" })
    return
  }

  res.status(200).json(cliente)
  return
}

async function atualizarCliente(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params)

  const cliente = await db.query.clientes.findFirst({
    where: (clientes, { eq }) => eq(clientes.id, id),
  })

  if (!cliente) {
    res.status(401).json({ message: "Cliente não encontrado" })
    return
  }

  const data = updateClienteSchema.parse(req.body)

  await db.update(clientes).set(data).where(eq(clientes.id, id))

  res.status(200).send({ message: "Cliente atualizado com sucesso" })

  return
}

async function excluirCliente(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params)

  const cliente = await db.query.clientes.findFirst({
    where: (clientes, { eq }) => eq(clientes.id, id),
  })

  if (!cliente) {
    res.status(401).json({ message: "Cliente não encontrado" })
    return
  }

  await db.delete(clientes).where(eq(clientes.id, id))
  res.status(200).json({ message: "Cliente excluido com sucesso" })
  return
}

export default {
  cadastrarCliente,
  listarClientes,
  mostrarCliente,
  atualizarCliente,
  excluirCliente,
}
