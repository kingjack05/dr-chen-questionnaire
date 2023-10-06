import { PatientBasicInfoForm } from "../../forms/PatientBasicInfoForm"
import { $addPatient } from "../../PatientPage/store"

export const ActionPanel = ({ api, columnApi }) => {
    return (
        <>
            <h6 className=" mb-1">新增病人</h6>
            <PatientBasicInfoForm
                withSubmit={true}
                onSubmit={(data) => {
                    $addPatient(data)
                }}
            />
            <h6 className=" mb-1 mt-2">載入問卷資料</h6>
            <div>
                <select>
                    <option>2022-09-22</option>
                </select>
            </div>
            <button
                className="btn mt-1 p-2"
                onClick={() => {
                    const selectedRow = api.getSelectedRows()
                    const transaction = {
                        update: [
                            {
                                ...selectedRow[0],
                                overallHandFunctionRight: "3",
                                overallHandFunctionLeft: "4",
                            },
                        ],
                    }
                    api.applyTransaction(transaction)
                }}
            >
                載入資料
            </button>
        </>
    )
}
