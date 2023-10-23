import { createTRPCReact } from "@trpc/react-query"
import type { AppRouter } from "../server/routerIndex"

export const trpc = createTRPCReact<AppRouter>()
