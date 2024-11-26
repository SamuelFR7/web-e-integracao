import { createInsertSchema } from "drizzle-zod"
import { produtos } from "~/db/schema"

export const createProdutoSchema = createInsertSchema(produtos).omit({
  id: true,
})

export const updateProdutoSchema = createInsertSchema(produtos, {
  nome: (schema) => schema.nome.optional(),
  preco: (schema) => schema.preco.optional(),
  tamanho: (schema) => schema.tamanho.optional(),
  categoriaId: (schema) => schema.categoriaId.optional(),
}).omit({
  id: true,
})
