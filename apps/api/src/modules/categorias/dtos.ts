import { createInsertSchema } from "drizzle-zod";
import { categorias } from "~/db/schema";

export const createCategoriaSchema = createInsertSchema(categorias).omit({id: true})

export const updateCategoriaSchema = createInsertSchema(categorias, {
  nome: (schema) => schema.nome.optional()
})
