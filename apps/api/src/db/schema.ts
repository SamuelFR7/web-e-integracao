import { relations } from "drizzle-orm"
import { integer, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").notNull().primaryKey(),
  nome: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  senha: varchar({ length: 255 }).notNull(),
})

export const clientes = pgTable("clientes", {
  id: serial("id").notNull().primaryKey(),
  codigo: varchar("codigo", { length: 10 }).notNull(),
  apelido: varchar("apelido", { length: 255 }).notNull(),
  nome: varchar("nome", { length: 255 }).notNull(),
  tipo: varchar("tipo", { length: 255 }),
  cpf: varchar("cpf", { length: 255 }).notNull(),
  cep: varchar("cep", { length: 255 }).notNull(),
  rua: varchar("rua", { length: 255 }).notNull(),
  numero: integer("numero").notNull(),
  complemento: varchar("complemento", { length: 255 }),
  bairro: varchar("bairro", { length: 255 }).notNull(),
})

export const tamanhosEnum = pgEnum("tamanhos", ["P", "M", "G"])

export const produtos = pgTable("produtos", {
  id: serial("id").notNull().primaryKey(),
  codigo: varchar("codigo", { length: 10 }).notNull(),
  nome: varchar("nome", { length: 255 }).notNull(),
  tamanho: tamanhosEnum("tamanho").notNull(),
  categoriaId: integer("categoria_id")
    .notNull()
    .references(() => categorias.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  preco: integer('preco').notNull().default(0)
})

export const produtosRelations = relations(produtos, ({ one }) => ({
  categoria: one(categorias, {
    fields: [produtos.categoriaId],
    references: [categorias.id],
  }),
}))

export const categorias = pgTable("categorias", {
  id: serial("id").notNull().primaryKey(),
  codigo: varchar("codigo", { length: 10 }).notNull(),
  nome: varchar("nome", { length: 255 }).notNull(),
})

export const categoriasRelations = relations(categorias, ({ many }) => ({
  produtos: many(produtos),
}))
