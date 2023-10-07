import { action, atom, computed, map } from "nanostores"

type PatientData = {
    mainDiagnosis: string
    gender: "male" | "female"
    name: string
    otherInfo?: any
}

const otherInfoTemp = {
    患側: "right",
    operations: [
        {
            date: "2022-09-19",
            followUp: [
                {
                    yearsAfterOP: "0",
                    digitalSkinTemp: "24.3",
                },
                {
                    yearsAfterOP: "1",
                    digitalSkinTemp: "28.3",
                },
                {
                    yearsAfterOP: "2",
                    digitalSkinTemp: "28.9",
                },
                {
                    yearsAfterOP: "3",
                    digitalSkinTemp: "28.8",
                },
                {
                    yearsAfterOP: "4",
                    digitalSkinTemp: "29.4",
                },
            ],
        },
    ],
}

const $patientDB = map<Record<string, PatientData>>({
    "10836635": {
        mainDiagnosis: "Raynaud's Phenomenon",
        gender: "male",
        name: "郭克嚴",
        otherInfo: otherInfoTemp,
    },
    "20912450": {
        mainDiagnosis: "Raynaud's Phenomenon",
        gender: "male",
        name: "陳瑞螢",
        otherInfo: otherInfoTemp,
    },
    "10372287": {
        mainDiagnosis: "Raynaud's Phenomenon",
        gender: "female",
        name: "王秀嬌",
        otherInfo: otherInfoTemp,
    },
    "9820992": {
        mainDiagnosis: "Raynaud's Phenomenon",
        gender: "male",
        name: "陳錦華",
        otherInfo: otherInfoTemp,
    },
    "1726349": {
        mainDiagnosis: "AIN Compression",
        gender: "female",
        name: "曹珊鍊",
    },
})

export const $addPatient = action($patientDB, "addPatient", (store, data) => {
    const { id, ...rest } = data
    store.setKey(id, rest)
})

export const $getPatientData = action(
    $patientDB,
    "getPatientData",
    (store, id) => {
        const db = store.get()
        return db[id]
    },
)

export const $patientIDAndNames = computed($patientDB, (db) => {
    return Object.entries(db).map(([id, data]) => ({ id, name: data.name }))
})

export const $raynaudPatients = computed($patientDB, (db) => {
    return Object.fromEntries(
        Object.entries(db).filter(
            ([key, value]) => value.mainDiagnosis === "Raynaud's Phenomenon",
        ),
    )
})

export const $AINPatients = computed($patientDB, (db) => {
    return Object.fromEntries(
        Object.entries(db).filter(
            ([key, value]) => value.mainDiagnosis === "AIN Compression",
        ),
    )
})
