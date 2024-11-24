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
