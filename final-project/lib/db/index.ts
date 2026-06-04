import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let sql: ReturnType<typeof postgres>;

if (process.env.NODE_ENV === "production") {
  sql = postgres(process.env.DATABASE_URL!);
} else {
  sql = postgres(process.env.DATABASE_URL!);
}

export const db = drizzle(sql, { schema });

