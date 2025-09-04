import { pgTable, serial, varchar, text, timestamp, boolean, integer, real, jsonb } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  image: text("image"), // optional
  description: text("description"), // optional
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  discount: integer("discount"),
  price: real("price").notNull(),
  brand: varchar("brand", { length: 255 }),
  published: boolean("published").default(false).notNull(),
});
