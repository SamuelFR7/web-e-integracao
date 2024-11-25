import { cpf } from "br-docs-validator"
import type { Request, Response } from "express"
import { z } from "zod"
import { db } from "~/db/db"
import { clientes } from "~/db/schema"

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

async function cadastrarCliente(req: Request, res: Response) {
  const data = cadastrarClienteSchema.parse(req.body)

  await db.insert(clientes).values({ ...data })

  res.status(201).json({ message: "Cliente cadastrado com sucesso" })
  return
}

export default {
  cadastrarCliente,
}
