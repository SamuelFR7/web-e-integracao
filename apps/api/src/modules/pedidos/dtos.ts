import { createInsertSchema } from "drizzle-zod"
import { pedidos } from "~/db/schema"

export const createPedidoSchema = createInsertSchema(pedidos)
