import type { Config } from "drizzle-kit"

export default {
    schema: "./src/server/schemaIndex.ts",
    out: "./src/server/.dbMigrations",
} satisfies Config
