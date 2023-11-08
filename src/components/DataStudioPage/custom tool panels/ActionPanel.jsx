import { Toaster } from "react-hot-toast"
import { useState } from "react"
import { Combobox } from "@headlessui/react"

import { trpc } from "../../trpc"

export const ActionPanel = ({ api, columnApi }) => {
    return (
        <>
            <h6 className=" mb-1">新增病人</h6>
            <AddRow />
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
            <Toaster />
        </>
    )
}

const AddRow = () => {
    const patientIDAndNames =
        trpc.patient.getPatientsIdAndName.useQuery().data ?? []

    const queryParameters = new URLSearchParams(window.location.search)
    const defaultPatientID = queryParameters.get("id") ?? "10836635"
    const diagnosis = queryParameters.get("table") ?? "Raynaud"
    const [patientId, setPatientId] = useState(defaultPatientID)
    const [query, setQuery] = useState(defaultPatientID)

    const addData = trpc.diagnosisData.addData.useMutation().mutateAsync

    const filteredPateints = query
        ? patientIDAndNames.filter((patient) => {
              return (
                  String(patient.id).includes(query) ||
                  patient.name.includes(query)
              )
          })
        : []

    return (
        <>
            <div className="relative">
                <Combobox value={patientId} onChange={setPatientId}>
                    <div className="relative">
                        <Combobox.Input
                            onChange={(e) => setQuery(e.target.value)}
                            className="peer mb-2 mr-3 mt-2 w-full border-b border-gray-300 bg-transparent px-8 py-1 leading-tight text-gray-700 focus:border-gray-500 focus:outline-none"
                            placeholder="輸入病歷號或姓名"
                            displayValue={(id) => id}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute left-0 top-2 h-6 w-6 fill-current text-gray-300 peer-focus:text-gray-500"
                            viewBox="0 0 32 32"
                        >
                            <path d="m29 27.586-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9 9.01 9.01 0 0 1-9-9Z" />
                        </svg>
                    </div>
                    <Combobox.Options className="absolute w-full bg-gray-100">
                        {filteredPateints.map((patient) => (
                            <Combobox.Option
                                key={patient.id}
                                value={patient.id}
                            >
                                {({ active }) => (
                                    <div
                                        className={`flex w-full p-1 ${
                                            active
                                                ? "bg-teal-600 text-white"
                                                : ""
                                        }`}
                                    >
                                        <div className="flex-1">
                                            {patient.id}
                                        </div>
                                        <div>{patient.name}</div>
                                    </div>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Combobox>
            </div>
            <button
                className="btn"
                onClick={async () => {
                    try {
                        await addData({
                            patientId: Number(patientId),
                            diagnosis,
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }}
            >
                新增
            </button>
        </>
    )
}
