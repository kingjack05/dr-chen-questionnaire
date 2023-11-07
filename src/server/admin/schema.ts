import { pgTable, text } from "drizzle-orm/pg-core"

export const admins = pgTable("admins", {
    username: text("username").primaryKey(),
    pwd: text("pwd").notNull(),
})
