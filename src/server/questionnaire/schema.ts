import { pgTable, integer, serial, date, text } from "drizzle-orm/pg-core"
import { patient } from "../patients/schema"

const questions: {
    [qNum: string]: any
} = {}
for (let i = 1; i <= 57; i++) {
    questions[`q${i}`] = integer(`q${i}`)
}

export const michiganHandOutcomeResponse = pgTable(
    "michiganHandOutcomeResponse",
    {
        id: serial("id").primaryKey(),
        date: date("date", { mode: "date" }).notNull().defaultNow(),
        patientId: integer("patientId")
            .references(() => patient.id)
            .notNull(),
        ...questions,
        handedness: integer("handedness"),
        affectedSide: integer("affectedSide"),
        changedJob: integer("changedJob"),
        previousJob: text("previousJob"),
        currentJob: text("currentJob"),
    },
)
