import { z } from "zod"
import { db } from "../db"
import { createTRPCRouter, publicProcedure } from "../trpcInstance"
import { insertPatientSchema, patient } from "./schema"
import { eq } from "drizzle-orm"
import { ListObjectsV2Command } from "@aws-sdk/client-s3"

export const patientRouter = createTRPCRouter({
    patientById: publicProcedure.input(z.number()).query(async (req) => {
        const result = await db.query.patient.findFirst({
            where: (patient, { eq }) => eq(patient.id, req.input),
        })
        return result
    }),
    patients: publicProcedure.query(async () => {
        const patients = await db.query.patient.findMany()
        console.log(patients)
        return patients
    }),
    patientLastEdited: publicProcedure.query(async () => {
        const patientLastEdited = await db.query.patient.findFirst({
            orderBy: (patient, { desc }) => [desc(patient.lastEdited)],
        })
        return patientLastEdited
    }),
    addPatient: publicProcedure
        .input(insertPatientSchema)
        .mutation(async (opts) => {
            const data = opts.input
            await db.insert(patient).values(data)
        }),
    editPatient: publicProcedure
        .input(insertPatientSchema)
        .mutation(async (opts) => {
            const data = opts.input
            console.log(data)
            try {
                await db
                    .update(patient)
                    .set(data)
                    .where(eq(patient.id, data.id))
            } catch (error) {
                console.log(error)
            }
        }),
    getFiles: publicProcedure.query(async ({ ctx }) => {
        const { s3 } = ctx
        const command = new ListObjectsV2Command({ Bucket: "reason" })
        let listObjectsOutput
        try {
            listObjectsOutput = await s3.send(command)
            console.log(listObjectsOutput)
        } catch (error) {
            console.log(error)
        }

        return listObjectsOutput?.Contents ?? []
    }),
})
