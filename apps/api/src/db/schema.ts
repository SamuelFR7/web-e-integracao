import { pgTable, serial, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").notNull().primaryKey(),
  nome: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  senha: varchar({ length: 255 }).notNull(),
})
