import { relations } from "drizzle-orm"
import { integer, text, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").notNull().primaryKey(),
  nome: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  senha: varchar({ length: 255 }).notNull(),
})

export const clientes = pgTable("clientes", {
  id: serial("id").notNull().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
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

export const cupons = pgTable('cupons', {
  id: serial("id").notNull().primaryKey(),
  codigo: varchar("codigo", { length: 10 }).notNull(),
  valor: integer('valor').notNull()
})

export const statusPedidos = pgEnum('status_pedidos', ['Pendente', 'Recebido', 'Em preparo', 'Entregador a caminho', 'Entregue', 'Cancelado'])

export const formasDePagamento = pgEnum('formas_de_pagamento', ['pix', 'credito', 'debito', 'dinheiro'])

export const pedidos = pgTable('pedidos', {
  id: serial("id").notNull().primaryKey(),
  status: statusPedidos('status').notNull().default('Pendente'),
  clienteId: integer('cliente_id').notNull().references(() => clientes.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }),
  cep: varchar("cep", { length: 255 }).notNull(),
  rua: varchar("rua", { length: 255 }).notNull(),
  numero: integer("numero").notNull(),
  complemento: varchar("complemento", { length: 255 }),
  bairro: varchar("bairro", { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  observacao: text('observacao'),
  formaDePagamento: formasDePagamento('forma_de_pagamento').notNull().default('dinheiro')
})

export const pedidosRelations = relations(pedidos, ({one, many}) => ({
  cliente: one(clientes, {
    fields: [pedidos.clienteId],
    references: [clientes.id]
  }),
  produtosPedidos: many(produtosPedidos)
}))

export const produtosPedidos = pgTable('produtos_pedidos', {
  id: serial("id").notNull().primaryKey(),
  pedidoId: integer('pedido_id').notNull().references(() => pedidos.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
  produtoId: integer('produto_id').notNull().references(() => produtos.id, {
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
})

export const produtosPedidosRelations = relations(produtosPedidos, ({one}) => ({
  produto: one(produtos, {
    fields: [produtosPedidos.produtoId],
    references: [produtos.id]
  }),
  pedido: one(pedidos, {
    fields: [produtosPedidos.pedidoId],
    references: [pedidos.id]
  })
}))
