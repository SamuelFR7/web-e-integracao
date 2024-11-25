CREATE TYPE "public"."tamanhos" AS ENUM('P', 'M', 'G');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categorias" (
	"id" serial PRIMARY KEY NOT NULL,
	"codigo" varchar(10) NOT NULL,
	"nome" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "produtos" (
	"id" serial PRIMARY KEY NOT NULL,
	"codigo" varchar(10) NOT NULL,
	"nome" varchar(255) NOT NULL,
	"tamanho" "tamanhos" NOT NULL,
	"categoria_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoria_id_categorias_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
