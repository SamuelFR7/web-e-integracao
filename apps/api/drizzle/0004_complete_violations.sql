CREATE TABLE IF NOT EXISTS "cupons" (
	"id" serial PRIMARY KEY NOT NULL,
	"codigo" varchar(10) NOT NULL,
	"valor" integer NOT NULL
);
