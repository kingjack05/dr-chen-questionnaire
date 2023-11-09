import {
    pgTable,
    integer,
    serial,
    date,
    text,
    boolean,
    unique,
} from "drizzle-orm/pg-core"
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
        done: boolean("done"),
        ...michiganQuestions,
        handedness: integer("handedness"),
        affectedSide: integer("affectedSide"),
        changedJob: integer("changedJob"),
        previousJob: text("previousJob"),
        currentJob: text("currentJob"),
    },
    (t) => ({
        unq: unique().on(t.patientId, t.date),
    }),
)

const sf36Questions: {
    [qNum: string]: any
} = {}
for (let i = 1; i <= 36; i++) {
    sf36Questions[`q${i}`] = integer(`q${i}`)
}
export const sf36Response = pgTable(
    "sf36Response",
    {
        id: serial("id").primaryKey(),
        date: date("date", { mode: "date" }).notNull().defaultNow(),
        patientId: integer("patientId")
            .references(() => patient.id)
            .notNull(),
        done: boolean("done"),
        ...sf36Questions,
    },
    (t) => ({
        unq: unique().on(t.patientId, t.date),
    }),
)

const sf12Questions: {
    [qNum: string]: any
} = {}
for (let i = 1; i <= 12; i++) {
    sf12Questions[`q${i}`] = integer(`q${i}`)
}
export const sf12Response = pgTable(
    "sf12Response",
    {
        id: serial("id").primaryKey(),
        date: date("date", { mode: "date" }).notNull().defaultNow(),
        patientId: integer("patientId")
            .references(() => patient.id)
            .notNull(),
        done: boolean("done"),
        ...sf12Questions,
    },
    (t) => ({
        unq: unique().on(t.patientId, t.date),
    }),
)

const dashQuestions: {
    [qNum: string]: any
} = {}
for (let i = 1; i <= 38; i++) {
    dashQuestions[`q${i}`] = integer(`q${i}`)
}
export const dashResponse = pgTable(
    "dashResponse",
    {
        id: serial("id").primaryKey(),
        date: date("date", { mode: "date" }).notNull().defaultNow(),
        patientId: integer("patientId")
            .references(() => patient.id)
            .notNull(),
        done: boolean("done"),
        ...dashQuestions,
        hasJob: integer("hasJob"),
        job: text("job"),
        hasSportOrInstrument: integer("hasSportOrInstrument"),
        sportOrInstrument: text("sportOrInstrument"),
    },
    (t) => ({
        unq: unique().on(t.patientId, t.date),
    }),
)

const qDashQuestions: {
    [qNum: string]: any
} = {}
for (let i = 1; i <= 19; i++) {
    qDashQuestions[`q${i}`] = integer(`q${i}`)
}
export const qDashResponse = pgTable(
    "qDashResponse",
    {
        id: serial("id").primaryKey(),
        date: date("date", { mode: "date" }).notNull().defaultNow(),
        patientId: integer("patientId")
            .references(() => patient.id)
            .notNull(),
        done: boolean("done"),
        ...qDashQuestions,
        hasJob: integer("hasJob"),
        job: text("job"),
        hasSportOrInstrument: integer("hasSportOrInstrument"),
        sportOrInstrument: text("sportOrInstrument"),
    },
    (t) => ({
        unq: unique().on(t.patientId, t.date),
    }),
)

const bctQuestions: {
    [qNum: string]: any
} = {}
for (let i = 1; i <= 19; i++) {
    bctQuestions[`q${i}`] = integer(`q${i}`)
}
export const bctResponse = pgTable(
    "bctResponse",
    {
        id: serial("id").primaryKey(),
        date: date("date", { mode: "date" }).notNull().defaultNow(),
        patientId: integer("patientId")
            .references(() => patient.id)
            .notNull(),
        done: boolean("done"),
        ...bctQuestions,
    },
    (t) => ({
        unq: unique().on(t.patientId, t.date),
    }),
)

const bsrsQuestions: {
    [qNum: string]: any
} = {}
for (let i = 1; i <= 30; i++) {
    bsrsQuestions[`q${i}`] = integer(`q${i}`)
}
export const bsrsResponse = pgTable(
    "bsrsResponse",
    {
        id: serial("id").primaryKey(),
        date: date("date", { mode: "date" }).notNull().defaultNow(),
        patientId: integer("patientId")
            .references(() => patient.id)
            .notNull(),
        done: boolean("done"),
        ...bsrsQuestions,
    },
    (t) => ({
        unq: unique().on(t.patientId, t.date),
    }),
)

const whoqolBrefQuestions: {
    [qNum: string]: any
} = {}
for (let i = 1; i <= 28; i++) {
    whoqolBrefQuestions[`q${i}`] = integer(`q${i}`)
}
export const whoqolBrefResponse = pgTable(
    "whoqolBrefResponse",
    {
        id: serial("id").primaryKey(),
        date: date("date", { mode: "date" }).notNull().defaultNow(),
        patientId: integer("patientId")
            .references(() => patient.id)
            .notNull(),
        done: boolean("done"),
        ...whoqolBrefQuestions,
    },
    (t) => ({
        unq: unique().on(t.patientId, t.date),
    }),
)
