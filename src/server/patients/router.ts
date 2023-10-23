import { db } from "../db"
import { createTRPCRouter, publicProcedure } from "../trpcInstance"

export const patientRouter = createTRPCRouter({
    patients: publicProcedure.query(async () => {
        const patients = await db.query.patient.findMany()
        console.log(patients)
        return patients
    }),
})
