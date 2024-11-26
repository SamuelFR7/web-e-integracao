import { cpf } from "br-docs-validator"
import { eq } from "drizzle-orm"
import type { Request, Response } from "express"
import { z } from "zod"
import { db } from "~/db/db"
import { clientes } from "~/db/schema"
import { paramsSchema } from "~/shared/schemas"

const cadastrarClienteSchema = z.object({
  codigo: z.string().toUpperCase(),
  apelido: z.string().toUpperCase(),
  nome: z.string().toUpperCase(),
  tipo: z.string().toUpperCase().optional(),
  cpf: z.string().refine((v) => cpf.isValid(v), "CPF inválido"),
  cep: z.string(),
  rua: z.string().toUpperCase(),
  numero: z.number().positive(),
  complemento: z.string().toUpperCase().optional(),
  bairro: z.string().toUpperCase(),
})

const atualizarClienteSchema = z.object({
  codigo: z.string().toUpperCase().optional(),
  apelido: z.string().toUpperCase().optional(),
  nome: z.string().toUpperCase().optional(),
  tipo: z.string().toUpperCase().optional().optional(),
  cpf: z
    .string()
    .refine((v) => cpf.isValid(v), "CPF inválido")
    .optional(),
  cep: z.string().optional(),
  rua: z.string().toUpperCase().optional(),
  numero: z.number().positive().optional(),
  complemento: z.string().toUpperCase().optional().optional(),
  bairro: z.string().toUpperCase().optional(),
})

async function cadastrarCliente(req: Request, res: Response) {
  const data = cadastrarClienteSchema.parse(req.body)

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

  res.status(200).json(cliente)
  return
}

async function atualizarCliente(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params)
  const data = atualizarClienteSchema.parse(req.body)

  await db.update(clientes).set(data).where(eq(clientes.id, id))

  res.status(200).send({ message: "Cliente atualizado com sucesso" })

  return
}

async function excluirCliente(req: Request, res: Response) {
  const { id } = paramsSchema.parse(req.params)

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
