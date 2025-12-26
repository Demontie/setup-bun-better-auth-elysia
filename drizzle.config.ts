import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './src/infra/db/drizzle/migrations',
  schema: './src/infra/db/drizzle/schemas',
  dialect: 'postgresql',
  migrations: {
    prefix: 'timestamp',
    table: '__drizzle_migrations__',
    schema: 'public',
  },
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  casing: 'snake_case',
});
