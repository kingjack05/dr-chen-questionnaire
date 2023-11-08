import { z } from "zod"
import { eq, and } from "drizzle-orm"

import { createTRPCRouter, adminProcedure } from "../trpcInstance"
import { raynaudData } from "./schema"
import { db } from "../db"
import { patient } from "../schemaIndex"
import type { PgTableWithColumns } from "drizzle-orm/pg-core"

const tableMap: { [diagnosis: string]: PgTableWithColumns<any> } = {
    Raynaud: raynaudData,
}

export const diagnosisDataRouter = createTRPCRouter({
    getRaynaudData: adminProcedure.query(async () => {
        const results = db
            .select()
            .from(raynaudData)
            .innerJoin(patient, eq(raynaudData.patientId, patient.id))

        return results
    }),
    getData: adminProcedure
        .input(z.object({ patientId: z.number(), diagnosis: z.string() }))
        .query(async ({ input }) => {
            const { patientId, diagnosis } = input
            const table = tableMap[diagnosis]

            const results = db
                .select()
                .from(table)
                .where(eq(table.patientId, patientId))

            return results
        }),
    addData: adminProcedure
        .input(z.object({ patientId: z.number(), diagnosis: z.string() }))
        .mutation(async ({ input }) => {
            const { patientId, diagnosis } = input

            if (diagnosis === "Raynaud") {
                try {
                    const result = await db.insert(raynaudData).values([
                        { patientId, postOPYear: 0 },
                        { patientId, postOPYear: 1 },
                    ])
                    return result
                } catch (error) {
                    console.log(error)
                }
            }
        }),
    test: adminProcedure.query(() => {
        return Object.keys(raynaudData).map((key) => ({ field: key }))
    }),
})
