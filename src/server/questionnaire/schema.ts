import { pgTable, integer, serial } from "drizzle-orm/pg-core"
import { patient } from "../patients/schema"

export const michiganHandOutcome = pgTable("michiganHandOutcome", {
    id: serial("id").primaryKey(),
    patientId: integer("patientId").references(() => patient.id),
})
