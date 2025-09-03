CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"discount" integer,
	"price" real NOT NULL,
	"category" varchar(255),
	"brand" varchar(255),
	"features" jsonb,
	"published" boolean DEFAULT false NOT NULL
);
