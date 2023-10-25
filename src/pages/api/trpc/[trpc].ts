import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import type { APIRoute } from "astro"
import { appRouter } from "../../../server/routerIndex"
import { createTRPCContext } from "../../../server/trpcInstance"

export const prerender = false

export const ALL: APIRoute = ({ request }) => {
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req: request,
        router: appRouter,
        createContext: createTRPCContext,
        onError({ error }) {
            if (import.meta.env.DEV && error.code === "INTERNAL_SERVER_ERROR") {
                throw error
            }
        },
    })
}
