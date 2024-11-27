import { createInsertSchema } from "drizzle-zod"
import { cupons } from "~/db/schema"

export const createCupomSchema = createInsertSchema(cupons).omit({
  id: true,
})

export const updateCupomSchema = createInsertSchema(cupons, {
  valor: (schema) => schema.valor.optional(),
  codigo: (schema) => schema.codigo.optional(),
}).omit({ id: true })
