import { z } from "zod"
import { db } from "../db"
import {
    adminProcedure,
    createTRPCRouter,
    publicProcedure,
} from "../trpcInstance"
import { FileDataZodObj, insertPatientSchema, patient } from "./schema"
import { eq } from "drizzle-orm"
import {
    ListObjectsV2Command,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export const patientRouter = createTRPCRouter({
    patientById: publicProcedure.input(z.number()).query(async (req) => {
        const result = await db.query.patient.findFirst({
            where: (patient, { eq }) => eq(patient.id, req.input),
        })
        return result
    }),
    patientByNameAndBDay: publicProcedure
        .input(z.object({ name: z.string(), bday: z.date() }))
        .mutation(async (req) => {
            try {
                console.log("name: ", req.input.name, "bday: ", req.input.bday)
                const result = await db.query.patient.findFirst({
                    where: (patient, { eq }) =>
                        eq(patient.name, req.input.name) &&
                        eq(patient.birthday, req.input.bday),
                })
                return result
            } catch (error) {
                console.log(error)
            }
        }),
    getPatientsIdAndName: adminProcedure.query(async () => {
        const patients = await db.query.patient.findMany({
            columns: {
                id: true,
                name: true,
            },
        })
        return patients
    }),
    patientLastEdited: publicProcedure.query(async () => {
        const patientLastEdited = await db.query.patient.findFirst({
            orderBy: (patient, { desc }) => [desc(patient.lastEdited)],
        })
        return patientLastEdited
    }),
    addPatient: adminProcedure
        .input(insertPatientSchema)
        .mutation(async (opts) => {
            const data = opts.input
            await db.insert(patient).values(data)
        }),
    editPatient: adminProcedure
        .input(insertPatientSchema)
        .mutation(async (opts) => {
            const data = opts.input
            try {
                await db
                    .update(patient)
                    .set(data)
                    .where(eq(patient.id, data.id))
            } catch (error) {
                console.log(error)
            }
        }),
    getFiles: adminProcedure.query(async ({ ctx }) => {
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
    getStandardUploadPresignedUrl: adminProcedure
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
    deleteFile: adminProcedure
        .input(z.object({ key: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { key } = input
            const { s3 } = ctx

            const deleteObjectCommand = new DeleteObjectCommand({
                Bucket: "reason",
                Key: key,
            })

            return await s3.send(deleteObjectCommand)
        }),
    addFileData: adminProcedure
        .input(FileDataZodObj.and(z.object({ id: z.number() })))
        .mutation(async ({ input }) => {
            const { url, date, type, extension, id } = input
            try {
                const originalData = await db.query.patient.findFirst({
                    where: (patient, { eq }) => eq(patient.id, id),
                })
                const originalFiles = originalData?.files
                    ? originalData?.files
                    : []
                await db
                    .update(patient)
                    .set({
                        files: [
                            ...originalFiles,
                            { url, date, type, extension },
                        ],
                    })
                    .where(eq(patient.id, id))
            } catch (error) {
                console.log(error)
            }
        }),
    deleteFileData: adminProcedure
        .input(z.object({ url: z.string(), id: z.number() }))
        .mutation(async ({ input }) => {
            const { url, id } = input
            try {
                const originalData = await db.query.patient.findFirst({
                    where: (patient, { eq }) => eq(patient.id, id),
                })
                const originalFiles = originalData?.files // @ts-ignore
                    ? originalData.files.filter((file) => file.url !== url)
                    : []
                await db
                    .update(patient)
                    .set({
                        files: originalFiles,
                    })
                    .where(eq(patient.id, id))
            } catch (error) {
                console.log(error)
            }
        }),
})
