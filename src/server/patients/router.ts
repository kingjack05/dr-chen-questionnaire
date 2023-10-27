import { z } from "zod"
import { db } from "../db"
import { createTRPCRouter, publicProcedure } from "../trpcInstance"
import { FileDataZodObj, insertPatientSchema, patient } from "./schema"
import { eq } from "drizzle-orm"
import { ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

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
        } catch (error) {
            console.log(error)
        }

        return listObjectsOutput?.Contents ?? []
    }),
    getStandardUploadPresignedUrl: publicProcedure
        .input(z.object({ key: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { key } = input
            const { s3 } = ctx

            const putObjectCommand = new PutObjectCommand({
                Bucket: "reason",
                Key: key,
            })

            return await getSignedUrl(s3, putObjectCommand)
        }),
    addFileData: publicProcedure
        .input(FileDataZodObj.and(z.object({ id: z.number() })))
        .mutation(async ({ input }) => {
            const { url, date, id } = input
            try {
                const originalData = await db.query.patient.findFirst({
                    where: (patient, { eq }) => eq(patient.id, id),
                })
                const originalFiles = originalData?.files
                    ? originalData?.files
                    : []
                await db
                    .update(patient)
                    .set({ files: [...originalFiles, { url, date }] })
                    .where(eq(patient.id, id))
            } catch (error) {
                console.log(error)
            }
        }),
})
