import { atom, computed } from "nanostores"
import { $currentPatientData } from "../PatientPage/store"

export const $currentTable = computed(
    $currentPatientData,
    (currentPatientData) => {
        return currentPatientData.mainDiagnosis
    },
)

export const $currentTableColumnDefs = computed(
    $currentTable,
    (currentTable) => {
        const commonFields = [
            {
                headerName: "基本資料",
                children: [
                    { field: "id" },
                    { field: "name", columnGroupShow: "open" },
                    { field: "gender", columnGroupShow: "open" },
                    { field: "birthday", columnGroupShow: "open" },
                ],
            },
        ]
        if (currentTable === "Raynaud's Phenomenon") {
            return [
                ...commonFields,
                {
                    headerName: "疾病資料",
                    children: [
                        { field: "患側" },
                        {
                            headerName: "風險因子",
                            children: [
                                { field: "抽菸" },
                                { field: "自體免疫疾病" },
                                { field: "心理疾病" },
                            ],
                            columnGroupShow: "open",
                        },
                    ],
                },
                {
                    headerName: "手術資料",
                    children: [{ field: "date", headerName: "時間" }],
                },
                {
                    headerName: "追蹤資料",
                    children: [
                        { field: "yearsAfterOP" },
                        { field: "digitalSkinTemp" },
                        {
                            headerName: "問卷資料",
                            children: [
                                {
                                    headerName: "Michigan",
                                    children: [
                                        {
                                            field: "overallHandFunctionRight",
                                        },
                                        {
                                            field: "overallHandFunctionLeft",
                                        },
                                        {
                                            field: "ADLRHOnehanded",
                                        },
                                        {
                                            field: "ADLRHOverall",
                                        },
                                        {
                                            field: "ADLLHOnehanded",
                                        },
                                        {
                                            field: "ADLLHOverall",
                                        },
                                        {
                                            field: "ADLTwohanded",
                                        },
                                        {
                                            field: "work",
                                        },
                                        {
                                            field: "pain",
                                        },
                                        {
                                            field: "aestheticsRight",
                                        },
                                        {
                                            field: "aestheticsLeft",
                                        },
                                        {
                                            field: "satisfactionRight",
                                        },
                                        {
                                            field: "satisfactionLeft",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ]
        }
        if (currentTable === "AIN Compression") {
            return [...commonFields]
        }
    },
)

export const $currentTableRowID = computed($currentTable, (currentTable) => {
    if (currentTable === "Raynaud's Phenomenon") {
        return (params: any) => {
            return `${params.data.id}${params.data.date}${params.data.yearsAfterOP}`
        }
    }
})
