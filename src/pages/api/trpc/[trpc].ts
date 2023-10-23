import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import type { APIRoute } from "astro"
import { appRouter } from "../../../server/routerIndex"

export const prerender = false

export const ALL: APIRoute = ({ request }) => {
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req: request,
        router: appRouter,
        createContext: ({ req, resHeaders }) => {
            return { req, resHeaders }
        },
        onError({ error }) {
            if (import.meta.env.DEV && error.code === "INTERNAL_SERVER_ERROR") {
                throw error
            }
        },
    })
}
