import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema.tsx",
  out: "./src/drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }
});

