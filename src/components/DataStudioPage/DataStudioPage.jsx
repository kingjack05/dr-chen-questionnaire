import { AgGridReact } from "ag-grid-react"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import "ag-grid-enterprise"
import { useMemo } from "react"
import { $AINPatients, $raynaudPatients } from "../PatientPage/store"
import { StatisticalAnalysisPanel } from "./custom tool panels/StatisticalAnalysisPanel"
import { ActionPanel } from "./custom tool panels/ActionPanel"
import { trpc } from "../trpc"
import { QueryContextProvider } from "../Providers/QueryContext"

const DataStudioPageWithoutProvider = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const table = queryParameters.get("table") ?? "Raynaud's Phenomenon"
    document.title = table + " 表格"
    const patientID = queryParameters.get("id") ?? "10836635"
    const { rowData, columnDefs, rowIDGetter } = tableConfigsFactory(table)

    const defaultColDef = useMemo(
        () => ({
            editable: true,
            sortable: true,
            filter: true,
            resizable: true,
            initialWidth: 100,
        }),
        [],
    )

    return (
        <div
            className="ag-theme-alpine"
            style={{ height: "100vh", width: "100vw" }}
        >
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
                rowSelection={"single"}
                getRowId={rowIDGetter}
                sideBar={{
                    toolPanels: [
                        {
                            id: "columns",
                            labelDefault: "Columns",
                            labelKey: "columns",
                            iconKey: "columns",
                            toolPanel: "agColumnsToolPanel",
                        },
                        {
                            id: "actions",
                            labelDefault: "Actions",
                            labelKey: "actions",
                            iconKey: "actions",
                            toolPanel: ActionPanel,
                        },
                        {
                            id: "stats",
                            labelDefault: "數據分析",
                            labelKey: "stats",
                            iconKey: "stats",
                            toolPanel: StatisticalAnalysisPanel,
                        },
                    ],
                }}
            ></AgGridReact>
        </div>
    )
}

export const DataStudioPage = () => {
    return (
        <QueryContextProvider>
            <DataStudioPageWithoutProvider />
        </QueryContextProvider>
    )
}

/**
 * @param {string} table - Name of the table
 * @returns {{rowData, columnDefs, rowIDGetter}}
 */
const tableConfigsFactory = (table) => {
    if (table === "Raynaud's Phenomenon") {
        const raynaudPatients = $raynaudPatients.get()
        const rowData = Object.entries(raynaudPatients)
            .map(([id, patientData]) => {
                return patientData.otherInfo.operations.map((item) => {
                    const date = item.date
                    return item.followUp.map((i) => {
                        const yearsAfterOP = i.yearsAfterOP
                        const digitalSkinTemp = i.digitalSkinTemp
                        return {
                            id,
                            date,
                            yearsAfterOP,
                            digitalSkinTemp,
                            ...patientData.otherInfo,
                            ...patientData,
                        }
                    })
                })
            })
            .flat(Infinity)
        const columnDefs = [
            {
                headerName: "基本資料",
                children: [
                    { field: "id", editable: false },
                    { field: "name", columnGroupShow: "open", editable: false },
                    {
                        field: "gender",
                        columnGroupShow: "open",
                        editable: false,
                    },
                    {
                        field: "birthday",
                        columnGroupShow: "open",
                        editable: false,
                    },
                ],
            },
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
        const rowIDGetter = (params) => {
            return `${params.data.id}${params.data.date}${params.data.yearsAfterOP}`
        }
        return { rowData, columnDefs, rowIDGetter }
    }

    if (table === "AIN Compression") {
        const AINPatients = $AINPatients.get()
        const rowData = Object.entries(AINPatients).map(([id, patientData]) => {
            return { id, ...patientData }
        })
        const columnDefs = [
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
        const rowIDGetter = (params) => {
            return `${params.data.id}`
        }
        return { rowData, columnDefs, rowIDGetter }
    }
}
