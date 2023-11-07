import { adminRouter } from "./admin/router"
import { patientRouter } from "./patients/router"
import { questionnaireRouter } from "./questionnaire/router"
import { createTRPCRouter } from "./trpcInstance"

export const appRouter = createTRPCRouter({
    patient: patientRouter,
    questionnaire: questionnaireRouter,
    admin: adminRouter,
})

export type AppRouter = typeof appRouter
