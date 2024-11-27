CREATE TYPE "public"."formas_de_pagamento" AS ENUM('pix', 'credito', 'debito', 'dinheiro');--> statement-breakpoint
CREATE TYPE "public"."status_pedidos" AS ENUM('Pendente', 'Recebido', 'Em preparo', 'Entregador a caminho', 'Entregue', 'Cancelado');--> statement-breakpoint
CREATE TYPE "public"."tamanhos" AS ENUM('P', 'M', 'G');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categorias" (
	"id" serial PRIMARY KEY NOT NULL,
	"codigo" varchar(10) NOT NULL,
	"nome" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clientes" (
	"id" serial PRIMARY KEY NOT NULL,
	"codigo" varchar(10) NOT NULL,
	"apelido" varchar(255) NOT NULL,
	"nome" varchar(255) NOT NULL,
	"tipo" varchar(255),
	"cpf" varchar(255) NOT NULL,
	"cep" varchar(255) NOT NULL,
	"rua" varchar(255) NOT NULL,
	"numero" integer NOT NULL,
	"complemento" varchar(255),
	"bairro" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cupons" (
	"id" serial PRIMARY KEY NOT NULL,
	"codigo" varchar(10) NOT NULL,
	"valor" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pedidos" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "status_pedidos" DEFAULT 'Pendente' NOT NULL,
	"cliente_id" integer NOT NULL,
	"cep" varchar(255) NOT NULL,
	"rua" varchar(255) NOT NULL,
	"numero" integer NOT NULL,
	"complemento" varchar(255),
	"bairro" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"observacao" text,
	"forma_de_pagamento" "formas_de_pagamento" DEFAULT 'dinheiro' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "produtos" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(255) NOT NULL,
	"tamanho" "tamanhos" NOT NULL,
	"categoria_id" integer NOT NULL,
	"preco" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "produtos_pedidos" (
	"id" serial PRIMARY KEY NOT NULL,
	"pedido_id" integer NOT NULL,
	"produto_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"senha" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoria_id_categorias_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "produtos_pedidos" ADD CONSTRAINT "produtos_pedidos_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "produtos_pedidos" ADD CONSTRAINT "produtos_pedidos_produto_id_produtos_id_fk" FOREIGN KEY ("produto_id") REFERENCES "public"."produtos"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
