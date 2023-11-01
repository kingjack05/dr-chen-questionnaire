import { z } from "zod"

import { db } from "../db"
import { createTRPCRouter, publicProcedure } from "../trpcInstance"
import { michiganHandOutcomeResponse } from "./schema"
import { eq, and } from "drizzle-orm"

export const questionnaireRouter = createTRPCRouter({
    responseByPatient: publicProcedure
        .input(z.object({ patientId: z.number(), questionnaire: z.string() }))
        .query(async (req) => {
            const { patientId, questionnaire } = req.input
            if (questionnaire === "MHO") {
                const result =
                    await db.query.michiganHandOutcomeResponse.findMany({
                        where: (response, { eq }) =>
                            eq(response.patientId, patientId),
                    })
                return result
            }
        }),
    responseTodayByPatient: publicProcedure
        .input(
            z.object({
                patientId: z.number(),
                questionnaire: z.string(),
                // seems like you can't use date objects in react query because they don't serialize to query keys properly
            }),
        )
        .query(async (req) => {
            const { patientId, questionnaire } = req.input
            const date = new Date()
            if (questionnaire === "MHO") {
                const result =
                    await db.query.michiganHandOutcomeResponse.findFirst({
                        where: (response, { eq, and }) =>
                            and(
                                eq(response.patientId, patientId),
                                eq(response.date, date),
                            ),
                    })
                if (!result) {
                    return null
                }
                return result
            }
        }),
    addResponse: publicProcedure
        .input(
            z.object({
                patientId: z.number(),
                questionnaire: z.string(),
                date: z.date(),
            }),
        )
        .mutation(async (req) => {
            const { questionnaire } = req.input
            if (questionnaire === "MHO") {
                try {
                    const result = await db
                        .insert(michiganHandOutcomeResponse)
                        .values(req.input)
                        .returning()
                    return result
                } catch (error) {
                    console.log(error)
                }
            }
        }),
    saveResponse: publicProcedure
        .input(
            z.object({
                patientId: z.number(),
                questionnaire: z.string(),
                date: z.date(),
                qNum: z.string(),
                value: z.number().or(z.string()),
            }),
        )
        .mutation(async (req) => {
            const { patientId, questionnaire, qNum, value, date } = req.input
            if (questionnaire === "MHO") {
                try {
                    await db
                        .update(michiganHandOutcomeResponse)
                        .set({ [qNum]: value })
                        .where(
                            and(
                                eq(
                                    michiganHandOutcomeResponse.patientId,
                                    patientId,
                                ),
                                eq(michiganHandOutcomeResponse.date, date),
                            ),
                        )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
})
