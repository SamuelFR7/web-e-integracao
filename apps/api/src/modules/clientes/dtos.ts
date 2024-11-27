import { cpf } from "br-docs-validator"
import { createInsertSchema } from "drizzle-zod"
import { clientes } from "~/db/schema"

export const createClienteSchema = createInsertSchema(clientes, {
  cpf: (schema) => schema.cpf.refine((v) => cpf.isValid(v), "CPF inválido"),
}).omit({
  id: true,
})

export const updateClienteSchema = createInsertSchema(clientes, {
  nome: (schema) => schema.nome.optional(),
  cep: (schema) => schema.cep.optional(),
  cpf: (schema) => schema.cpf.refine((v) => cpf.isValid(v), "CPF inválido").optional(),
  rua: (schema) => schema.rua.optional(),
  bairro: (schema) => schema.bairro.optional(),
  numero: (schema) => schema.numero.optional(),
  complemento: (schema) => schema.complemento.optional(),
}).omit({ id: true })
