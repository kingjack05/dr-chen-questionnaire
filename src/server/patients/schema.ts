import { z } from "zod"
import {
    pgTable,
    integer,
    text,
    date,
    timestamp,
    index,
    pgEnum,
} from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

export const genderEnum = ["male", "female"] as const
export const diagnosisEnum = ["Raynaud", "AIN Compression", "RA"] as const
export const questionnaireEnum = [
    "MHO",
    "SF36",
    "SF12",
    "BCT",
    "WHOQOLbref",
    "BSRS",
    "DASH",
    "qDASH",
] as const

// These don't work for some reason :(
export const genderPgEnum = pgEnum("gender", genderEnum)
export const diagnosisPgEnum = pgEnum("diagnosis", diagnosisEnum)
export const questionnairePgEnum = pgEnum("questionnaire", questionnaireEnum)

export const patient = pgTable(
    "patient",
    {
        id: integer("id").primaryKey(),
        name: text("name").notNull(),
        gender: text("gender", { enum: genderEnum }),
        birthday: date("birthday").notNull(),
        diagnoses: text("diagnoses", { enum: diagnosisEnum }).array(),
        followingQuestionnaires: text("followingQuestionnaires", {
            enum: questionnaireEnum,
        }).array(),
        lastEdited: timestamp("lastEdited").defaultNow(),
    },
    (table) => {
        return {
            nameIdx: index("nameIdx").on(table.name),
            lastEditedIdx: index("lastEditedIdx").on(table.lastEdited),
        }
    },
)

/**
 * drizzle-zod schema inferral buggy for arrays so have to manually make sure enums are corretly declared
 * @see https://github.com/drizzle-team/drizzle-orm/issues/1110
 */
export const insertPatientSchema = createInsertSchema(patient, {
    diagnoses: z.array(z.enum(diagnosisEnum)),
    followingQuestionnaires: z.array(z.enum(questionnaireEnum)),
    // transformer needed to use date objects https://trpc.io/docs/server/data-transformers
    // https://github.com/drizzle-team/drizzle-orm/issues/1185
    lastEdited: z.date(),
})
