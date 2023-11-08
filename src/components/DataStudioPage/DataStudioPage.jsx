import { AgGridReact } from "ag-grid-react"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import "ag-grid-enterprise"
import { useMemo } from "react"
import { StatisticalAnalysisPanel } from "./custom tool panels/StatisticalAnalysisPanel"
import { ActionPanel } from "./custom tool panels/ActionPanel"
import { trpc } from "../trpc"
import { QueryContextProvider } from "../Providers/QueryContext"
import { tableConfigsFactory } from "./tableConfigsFactory"

const DataStudioPageWithoutProvider = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const table = queryParameters.get("table") ?? "Raynaud"
    document.title = table + " 表格"
    const patientID = queryParameters.get("id") ?? "10836635"
    const { rowData, columnDefs, rowIDGetter, onGridReady } =
        tableConfigsFactory(table)

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
                onGridReady={onGridReady}
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
