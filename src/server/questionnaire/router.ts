import { z } from "zod"

import { db } from "../db"
import { createTRPCRouter, publicProcedure } from "../trpcInstance"
import {
    bctResponse,
    bsrsResponse,
    dashResponse,
    michiganHandOutcomeResponse,
    qDashResponse,
    sf12Response,
    sf36Response,
} from "./schema"
import { eq, and } from "drizzle-orm"
import type { PgTableWithColumns } from "drizzle-orm/pg-core"

const QuestionnaireDBMap: { [questionnaire: string]: PgTableWithColumns<any> } =
    {
        MHO: michiganHandOutcomeResponse,
        SF36: sf36Response,
        SF12: sf12Response,
        BCT: bctResponse,
        WHOQOLbref: bctResponse,
        BSRS: bsrsResponse,
        DASH: dashResponse,
        qDASH: qDashResponse,
    }

export const questionnaireRouter = createTRPCRouter({
    responseByPatient: publicProcedure
        .input(z.object({ patientId: z.number(), questionnaire: z.string() }))
        .query(async (req) => {
            const { patientId, questionnaire } = req.input
            const table = QuestionnaireDBMap[questionnaire]
            const result = await db
                .select()
                .from(table)
                .where(eq(table.patientId, patientId))
            return result
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
            const table = QuestionnaireDBMap[questionnaire]
            const result = await db
                .select()
                .from(table)
                .limit(1)
                .where(
                    and(eq(table.patientId, patientId), eq(table.date, date)),
                )
            return result[0]
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
            const table = QuestionnaireDBMap[questionnaire]
            try {
                const result = await db
                    .insert(table)
                    .values(req.input)
                    .returning()
                return result
            } catch (error) {
                console.log(error)
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
            const table = QuestionnaireDBMap[questionnaire]
            try {
                await db
                    .update(table)
                    .set({ [qNum]: value })
                    .where(
                        and(
                            eq(table.patientId, patientId),
                            eq(table.date, date),
                        ),
                    )
            } catch (error) {
                console.log(error)
            }
        }),
})
