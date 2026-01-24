// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";
// import * as schema from "./schema";

// const connectionString = process.env.DATABASE_URL!;

// // Create postgres client for queries
// const client = postgres(connectionString, { prepare: false });

// export const db = drizzle(client, { schema });

// export * from "./schema";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// This is crucial for local development to prevent "Max Clients" errors
const globalForDb = global as unknown as {
  conn: postgres.Sql | undefined;
};

// Use "prepare: false" for Neon session/pooling mode compatibility
const connectionString = process.env.DATABASE_URL!;

const client =
  globalForDb.conn ??
  postgres(connectionString, {
    prepare: false, // Disable prepared statements for pooling mode
    max: 10, // Limit the number of connections in the pool
  });

if (process.env.NODE_ENV !== "production") globalForDb.conn = client;

export const db = drizzle(client, { schema });
