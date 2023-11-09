import { z } from "zod"
import { eq, and } from "drizzle-orm"
import jwt from "jsonwebtoken"

import { db } from "../db"
import { createTRPCRouter, publicProcedure } from "../trpcInstance"
import { admins } from "./schema"

export const adminRouter = createTRPCRouter({
    login: publicProcedure
        .input(z.object({ username: z.string(), pwd: z.string() }))
        .mutation(async (req) => {
            const { username, pwd } = req.input

            const results = await db
                .select()
                .from(admins)
                .where(and(eq(admins.username, username), eq(admins.pwd, pwd)))

            if (!results.length) {
                return { status: "Failed" }
            }

            const user = results[0].username
            const token = jwt.sign(
                { user },
                import.meta.env.AWS_SECRET_ACCESS_KEY ??
                    process.env.AWS_SECRET_ACCESS_KEY,
                { expiresIn: "10h" },
            )

            return { status: "Success", token }
        }),
})
