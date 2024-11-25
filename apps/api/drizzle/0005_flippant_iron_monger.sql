CREATE TYPE "public"."formas_de_pagamento" AS ENUM('pix', 'credito', 'debito', 'dinheiro');--> statement-breakpoint
CREATE TYPE "public"."status_pedidos" AS ENUM('Pendente', 'Recebido', 'Em preparo', 'Entregador a caminho', 'Entregue', 'Cancelado');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pedidos" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "status_pedidos" DEFAULT 'Pendente' NOT NULL,
	"cliente_id" integer NOT NULL,
	"cep" varchar(255) NOT NULL,
	"rua" varchar(255) NOT NULL,
	"numero" integer NOT NULL,
	"complemento" varchar(255),
	"bairro" varchar(255) NOT NULL,
	"created_at" timestamp NOT NULL,
	"observacao" text,
	"forma_de_pagamento" "formas_de_pagamento" DEFAULT 'dinheiro' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "produtos_pedidos" (
	"id" serial PRIMARY KEY NOT NULL,
	"pedido_id" integer NOT NULL,
	"produto_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE cascade ON UPDATE cascade;
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
