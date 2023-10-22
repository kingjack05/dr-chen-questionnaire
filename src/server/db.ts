import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schemaIndex"

// Vite and node/vercel uses different ways to get env variables :(
// see https://docs.astro.build/zh-tw/guides/environment-variables/#getting-environment-variables
const DATABASE_URL = import.meta.env.DATABASE_URL ?? process.env.DATABASE_URL

const client = postgres(DATABASE_URL)

export const db = drizzle(client, { schema })
