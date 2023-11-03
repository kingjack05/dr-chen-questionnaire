import { pgTable, integer, serial, date, text } from "drizzle-orm/pg-core"
import { patient } from "../patients/schema"

const michiganQuestions: {
    [qNum: string]: any
} = {}
for (let i = 1; i <= 57; i++) {
    michiganQuestions[`q${i}`] = integer(`q${i}`)
}
export const michiganHandOutcomeResponse = pgTable(
    "michiganHandOutcomeResponse",
    {
        id: serial("id").primaryKey(),
        date: date("date", { mode: "date" }).notNull().defaultNow(),
        patientId: integer("patientId")
            .references(() => patient.id)
            .notNull(),
        ...michiganQuestions,
        handedness: integer("handedness"),
        affectedSide: integer("affectedSide"),
        changedJob: integer("changedJob"),
        previousJob: text("previousJob"),
        currentJob: text("currentJob"),
    },
)

const sf36Questions: {
    [qNum: string]: any
} = {}
for (let i = 1; i <= 36; i++) {
    sf36Questions[`q${i}`] = integer(`q${i}`)
}
export const sf36Response = pgTable("sf36Response", {
    id: serial("id").primaryKey(),
    date: date("date", { mode: "date" }).notNull().defaultNow(),
    patientId: integer("patientId")
        .references(() => patient.id)
        .notNull(),
    ...sf36Questions,
})

const sf12Questions: {
    [qNum: string]: any
} = {}
for (let i = 1; i <= 12; i++) {
    sf36Questions[`q${i}`] = integer(`q${i}`)
}
export const sf12Response = pgTable("sf12Response", {
    id: serial("id").primaryKey(),
    date: date("date", { mode: "date" }).notNull().defaultNow(),
    patientId: integer("patientId")
        .references(() => patient.id)
        .notNull(),
    ...sf12Questions,
})

const dashQuestions: {
    [qNum: string]: any
} = {}
for (let i = 1; i <= 30; i++) {
    dashQuestions[`q${i}`] = integer(`q${i}`)
}
export const dashResponse = pgTable("dashResponse", {
    id: serial("id").primaryKey(),
    date: date("date", { mode: "date" }).notNull().defaultNow(),
    patientId: integer("patientId")
        .references(() => patient.id)
        .notNull(),
    ...dashQuestions,
})

const qDashQuestions: {
    [qNum: string]: any
} = {}
for (let i = 1; i <= 11; i++) {
    qDashQuestions[`q${i}`] = integer(`q${i}`)
}
export const qDashResponse = pgTable("qDashResponse", {
    id: serial("id").primaryKey(),
    date: date("date", { mode: "date" }).notNull().defaultNow(),
    patientId: integer("patientId")
        .references(() => patient.id)
        .notNull(),
    ...sf12Questions,
})

const bctQuestions: {
    [qNum: string]: any
} = {}
for (let i = 1; i <= 19; i++) {
    bctQuestions[`q${i}`] = integer(`q${i}`)
}
export const bctResponse = pgTable("bctResponse", {
    id: serial("id").primaryKey(),
    date: date("date", { mode: "date" }).notNull().defaultNow(),
    patientId: integer("patientId")
        .references(() => patient.id)
        .notNull(),
    ...bctQuestions,
})

const bsrsQuestions: {
    [qNum: string]: any
} = {}
for (let i = 1; i <= 30; i++) {
    bsrsQuestions[`q${i}`] = integer(`q${i}`)
}
export const bsrsResponse = pgTable("bsrsResponse", {
    id: serial("id").primaryKey(),
    date: date("date", { mode: "date" }).notNull().defaultNow(),
    patientId: integer("patientId")
        .references(() => patient.id)
        .notNull(),
    ...bsrsQuestions,
})

const whoqolBrefQuestions: {
    [qNum: string]: any
} = {}
for (let i = 1; i <= 28; i++) {
    whoqolBrefQuestions[`q${i}`] = integer(`q${i}`)
}
export const whoqolBrefResponse = pgTable("whoqolBrefResponse", {
    id: serial("id").primaryKey(),
    date: date("date", { mode: "date" }).notNull().defaultNow(),
    patientId: integer("patientId")
        .references(() => patient.id)
        .notNull(),
    ...whoqolBrefQuestions,
})
