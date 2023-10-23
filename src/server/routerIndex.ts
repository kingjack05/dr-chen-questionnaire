import { patientRouter } from "./patients/router"
import { createTRPCRouter } from "./trpcInstance"

export const appRouter = createTRPCRouter({
    patient: patientRouter,
})

export type AppRouter = typeof appRouter
