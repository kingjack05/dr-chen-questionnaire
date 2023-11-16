// MIT License
// Copyright (c) 2022 Shoubhit Dash
// https://github.com/t3-oss/create-t3-app/blob/next/LICENSE

/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */
import type { inferAsyncReturnType } from "@trpc/server"

type reqWithAuth = Request & { headers: { authorization?: string } }
type CreateAstroContextOptions = Partial<{
    /** The incoming request. */
    req: reqWithAuth
    /** The outgoing headers. */
    resHeaders: Headers
}>

/** Replace this with an object if you want to pass things to `createContextInner`. */
type CreateContextOptions = {}

import { s3 } from "./s3Instance"
/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
const createInnerTRPCContext = (opts: CreateContextOptions) => {
    return { ...opts, s3 }
}

import jwt from "jsonwebtoken"
/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 * @see https://trpc.io/docs/server/context#inner-and-outer-context
 */
export const createTRPCContext = async (opts: CreateAstroContextOptions) => {
    const contextInner = createInnerTRPCContext({})

    const { req } = opts

    async function getUserFromHeader() {
        const authorization = req?.headers.get("authorization")
        if (authorization) {
            try {
                const user = jwt.verify(
                    authorization,
                    import.meta.env.AWS_SECRET_ACCESS_KEY ??
                        process.env.AWS_SECRET_ACCESS_KEY,
                )

                return user
            } catch (error) {
                console.log(authorization)
                console.log(error)
                return null
            }
        }
        return null
    }

    const user = await getUserFromHeader()

    return {
        ...contextInner,
        ...opts,
        user,
    }
}
type Context = inferAsyncReturnType<typeof createTRPCContext>

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import { z, ZodError } from "zod"

export const t = initTRPC.context<Context>().create({
    // transformer needed to use date objects https://trpc.io/docs/server/data-transformers
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        }
    },
})

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/[api]/router.ts" file.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure

/**
 * Procedure that requires request and response headers
 *
 * This will make sure that you can only call this procedure if you are handing API request and you
 * will send the response back to the client.
 */
export const apiProcedure = publicProcedure.use(async ({ ctx, next }) => {
    if (!ctx.req || !ctx.resHeaders) {
        throw new Error("You are missing `req` or `resHeaders` in your call.")
    }

    const req = ctx.req

    return next({
        ctx,
    })
})

export const adminProcedure = publicProcedure.use(async ({ ctx, next }) => {
    if (!ctx.req) {
        throw new Error("Missing req")
    }
    if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    return next({
        ctx,
    })
})
