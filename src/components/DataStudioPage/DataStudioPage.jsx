import { AgGridReact } from "ag-grid-react"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import "ag-grid-enterprise"
import { useMemo, useState } from "react"
import { useStore } from "@nanostores/react"
import { $currentTableColumnDefs, $currentTableRowID } from "./store"
import { $raynaudPatients } from "../PatientPage/store"
import { StatisticalAnalysisPanel } from "./custom tool panels/StatisticalAnalysisPanel"
import { ActionPanel } from "./custom tool panels/ActionPanel"

export const DataStudioPage = () => {
    const rowData = Object.entries(useStore($raynaudPatients))
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
    const currentTableColumnDefs = useStore($currentTableColumnDefs)
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
    const getRowId = useStore($currentTableRowID)

    return (
        <div
            className="ag-theme-alpine"
            style={{ height: "100vh", width: "100vw" }}
        >
            <AgGridReact
                columnDefs={currentTableColumnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
                rowSelection={"single"}
                getRowId={getRowId}
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
