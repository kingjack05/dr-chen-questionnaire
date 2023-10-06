import { useState, useEffect } from "react"

export const StatisticalAnalysisPanel = ({ api, columnApi }) => {
    const [mode, setMode] = useState("Linear Regression")
    const [visibleColumns, setVisibleColumns] = useState([])

    const onVisibilityChange = () => {
        setVisibleColumns(columnApi.getAllDisplayedColumns())
    }

    useEffect(() => {
        api.addEventListener("columnVisible", onVisibilityChange)
        api.addEventListener("columnMoved", onVisibilityChange)

        return () => {
            api.removeEventListener("columnVisible", onVisibilityChange)
            api.removeEventListener("columnMoved", onVisibilityChange)
        }
    }, [])

    return (
        <>
            <select
                value={mode}
                onChange={(e) => {
                    setMode(e.target.value)
                }}
            >
                <option value="Linear Regression">Linear Regression</option>
            </select>
            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                    <thead>
                        <tr className="h-12 border-b px-4 text-left align-middle font-medium text-gray-300 transition-colors hover:bg-gray-200/50">
                            <td className=" w-24">變數</td>
                            <td className="w-10">avg</td>
                            <td className="w-10">std</td>
                            <td className="w-10">r</td>
                            <td className="w-10">p</td>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleColumns.map((item) => (
                            <tr className=" border-b p-4 align-middle transition-colors last:border-0 last:bg-gray-400 hover:bg-gray-200/50">
                                <td>{item.getColId()}</td>
                                <td>{Math.floor(Math.random() * 100)}</td>
                                <td>{Math.floor(Math.random() * 100)}</td>
                                <td>{Math.floor(Math.random() * 100) / 100}</td>
                                <td>{Math.floor(Math.random() * 100) / 100}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
