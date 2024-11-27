import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"
import { pedidos } from "~/db/schema"

export const createPedidoSchema = createInsertSchema(pedidos)
  .omit({
    id: true,
    createdAt: true,
  })
  .extend({
    produtos: z.object({
      produtoId: z.number(),
      quantidade: z.number(),
    }).array(),
  })
