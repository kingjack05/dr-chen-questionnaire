import { patientRouter } from "./patients/router"
import { questionnaireRouter } from "./questionnaire/router"
import { createTRPCRouter } from "./trpcInstance"

export const appRouter = createTRPCRouter({
    patient: patientRouter,
    questionnaire: questionnaireRouter,
})

export type AppRouter = typeof appRouter
