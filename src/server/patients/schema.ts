import { pgTable, integer, text, json, date } from "drizzle-orm/pg-core"

type Diagnosis = "Raynaud" | "AIN Compression" | "RA"
type Questionnaire =
    | "MHO"
    | "SF36"
    | "SF12"
    | "BCT"
    | "WHOQOLbref"
    | "BSRS"
    | "DASH"
    | "qDASH"

export const patient = pgTable("patient", {
    id: integer("id").unique(),
    name: text("name"),
    birthday: date("birthday"),
    diagnoses: json("diagnoses").$type<Array<Diagnosis>>(),
    followingQuestionnaires: json("followingQuestionnaires").$type<
        Array<Questionnaire>
    >(),
})
