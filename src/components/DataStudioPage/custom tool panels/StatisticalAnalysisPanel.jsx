import { useState, useEffect } from "react"
import { client } from "@gradio/client"
import toast, { Toaster } from "react-hot-toast"

export const StatisticalAnalysisPanel = ({ api, columnApi }) => {
    const [mode, setMode] = useState("Linear Regression")
    const [visibleColumns, setVisibleColumns] = useState([])
    const [r, setR] = useState("")
    const [results, setResults] = useState([])

    const visibleColNames = visibleColumns.map((col) => col.colId)

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
            <div>
                已選取欄位:
                {visibleColNames.map((col) => (
                    <span key={col}>{col},</span>
                ))}
            </div>
            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                    <thead>
                        <tr className="h-12 border-b px-4 text-left align-middle font-medium text-gray-300 transition-colors hover:bg-gray-200/50">
                            <td className=" w-24">變數</td>
                            <td className="w-10">avg</td>
                            <td className="w-10">std</td>
                            <td className="w-10">coef</td>
                            <td className="w-10">p</td>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(({ col, avg, std, coef, p }) => (
                            <tr
                                className=" border-b p-4 align-middle transition-colors last:border-0 last:bg-gray-400 hover:bg-gray-200/50"
                                key={col}
                            >
                                <td>{col}</td>
                                <td>{Math.round(avg * 100) / 100}</td>
                                <td>{Math.round(std * 100) / 100}</td>
                                <td>{Math.round(coef * 100) / 100}</td>
                                <td>{Math.round(p * 100) / 100}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="my-2">R-squared: {Math.round(r * 100) / 100}</div>
            <button
                className="btn mt-2"
                onClick={async () => {
                    const app = await client(
                        "https://kingjack05-linearregression.hf.space/--replicas/88ps6/",
                    )

                    let rowData = []
                    api.forEachNodeAfterFilter((node) =>
                        rowData.push(node.data),
                    )
                    const data = rowData.map((row) =>
                        visibleColNames.map((col) => row[col]),
                    )

                    try {
                        const result = await app.predict("/predict", [
                            {
                                headers: visibleColNames, // headers: ["a", "b", "c"],
                                data, // data: [
                                //     [0, 0, 5],
                                //     [1, 1, 9],
                                // ],
                            },
                        ])
                        const parsedResult = JSON.parse(result.data)
                        const parsedTable1 = JSON.parse(parsedResult.table1)
                        setR(parsedResult.r)
                        setResults(
                            visibleColNames.map((col, index) => ({
                                col,
                                avg: parsedResult.mean[col],
                                std: parsedResult.std[col],
                                coef: Object.values(parsedTable1.coef)[
                                    index + 1
                                ],
                                p: Object.values(parsedTable1["P>|t|"])[
                                    index + 1
                                ],
                            })),
                        )
                        toast.success("成功")
                    } catch (error) {
                        toast.error("請檢查有無缺漏的值")
                        console.log(error)
                    }
                }}
            >
                產生報告
            </button>
            <Toaster />
        </>
    )
}
