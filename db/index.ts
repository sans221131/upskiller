// db/index.ts
// Purpose: Database connection pool for Neon PostgreSQL

import { Pool, neonConfig, neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Configure WebSocket constructor for serverless environment
// This is required for Cloudflare Workers and other serverless environments
if (typeof globalThis.WebSocket === "undefined") {
  // For environments without built-in WebSocket support
  // You might need to install and import a WebSocket polyfill
  console.warn("WebSocket not available in global scope");
}

// Export a function to create a new pool for each request
export function createDbPool() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "No DATABASE_URL provided. Set DATABASE_URL in your environment or create a .env.local file with DATABASE_URL=your_connection_string"
    );
  }

  return new Pool({ connectionString: url });
}

// Initialize the HTTP driver in a guarded way so the error is explicit
// when the environment variable is missing instead of failing with
// a less helpful runtime stack during package scripts.
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error(
    "No database connection string was provided to neon(). Please set the DATABASE_URL environment variable (e.g. in .env.local) before running this command."
  );
}

const sql = neon(DATABASE_URL);

export const db = drizzle({ client: sql, logger: false, schema: schema });
