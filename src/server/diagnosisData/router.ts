import { z } from "zod"
import { eq, and } from "drizzle-orm"

import { createTRPCRouter, adminProcedure } from "../trpcInstance"
import { AINData, raynaudData } from "./schema"
import { db } from "../db"
import { patient } from "../schemaIndex"
import type { PgTableWithColumns } from "drizzle-orm/pg-core"

const tableMap: { [diagnosis: string]: PgTableWithColumns<any> } = {
    Raynaud: raynaudData,
    "AIN Compression": AINData,
}

export const diagnosisDataRouter = createTRPCRouter({
    getAllData: adminProcedure
        .input(z.object({ diagnosis: z.string() }))
        .query(async ({ input }) => {
            const { diagnosis } = input
            const table = tableMap[diagnosis]
            const results = db
                .select()
                .from(table)
                .innerJoin(patient, eq(table.patientId, patient.id))

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

            if (diagnosis === "AIN Compression") {
                try {
                    const result = await db.insert(AINData).values([
                        { patientId, postOPMonth: 0 },
                        { patientId, postOPMonth: 1 },
                    ])
                    return result
                } catch (error) {
                    console.log(error)
                }
            }
        }),
    setData: adminProcedure
        .input(
            z.object({
                rowId: z.number(),
                diagnosis: z.string(),
                colName: z.string(),
                value: z.string().or(z.number()),
            }),
        )
        .mutation(async ({ input }) => {
            const { rowId, diagnosis, colName, value } = input
            const table = tableMap[diagnosis]
            try {
                const result = await db
                    .update(table)
                    .set({ [colName]: value })
                    .where(eq(table.id, rowId))
                return result
            } catch (error) {
                console.log(error)
            }
        }),
    test: adminProcedure.query(() => {
        return Object.keys(AINData).map((key) => ({ field: key }))
    }),
})
