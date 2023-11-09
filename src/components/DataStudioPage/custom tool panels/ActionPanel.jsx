import toast, { Toaster } from "react-hot-toast"
import { useState } from "react"
import { Combobox } from "@headlessui/react"

import { trpc } from "../../trpc"
import { scoreCalculator } from "../../PatientPage/scoreCalculator"

const dimensionsToColnameMap = {
    Raynaud: {
        "手部整體功能 - 右手": "MHOOverallR",
        "手部整體功能 - 左手": "MHOOverallL",
        "日常活動 - 右手單手": "MHOActivitiesROH",
        "日常活動 - 右手整體": "MHOActivitiesROverall",
        "日常活動 - 左手單手": "MHOActivitiesLOH",
        "日常活動 - 左手整體": "MHOActivitiesLOverall",
        "日常活動 - 雙手": "MHOActivitiesTH",
        工作: "MHOWork",
        疼痛: "MHOPain",
        "美觀 - 右手": "MHOAestheticsR",
        "美觀 - 左手": "MHOAestheticsL",
        "滿意度 - 右手": "MHOSatisfactionR",
        "滿意度 - 左手": "MHOSatisfactionL",
        "Physical Function": "SF36PhyFunc",
        "Role Physical": "SF36RolePhy",
        "Body Pain": "SF36BodyPain",
        "General Health": "SF36GenHealth",
        Vitality: "SF36Vitality",
        "Social Function": "SF36SocialFunc",
        "Role Emotion": "SF36RoleEmotion",
        "Mental Health": "SF36MentalHealth",
    },
}

export const ActionPanel = ({ api, columnApi }) => {
    const patientIDAndNames =
        trpc.patient.getPatientsIdAndName.useQuery().data ?? []

    const queryParameters = new URLSearchParams(window.location.search)

    const defaultPatientID = queryParameters.get("id") ?? "10836635"
    const diagnosis = queryParameters.get("table") ?? "Raynaud"
    const [patientId, setPatientId] = useState(defaultPatientID)
    const [query, setQuery] = useState(defaultPatientID)

    const addData = trpc.diagnosisData.addData.useMutation().mutateAsync
    const saveData = trpc.diagnosisData.setData.useMutation().mutateAsync

    const filteredPateints = query
        ? patientIDAndNames.filter((patient) => {
              return (
                  String(patient.id).includes(query) ||
                  patient.name.includes(query)
              )
          })
        : []

    const [questionnaire, setQuestionnaire] = useState("")
    const QuestionnaireData =
        trpc.questionnaire.responseByPatient
            .useQuery({
                questionnaire,
                patientId: Number(patientId),
            })
            .data?.filter(({ done }) => done) ?? []
    const [selectedDate, setSelectedDate] = useState("")

    if (!QuestionnaireData) {
        return <>Loading...</>
    }
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
                        toast.success("成功新增。請重新整理")
                    } catch (error) {
                        toast.error("出了點問題...")
                        console.log(error)
                    }
                }}
            >
                新增病人資料
            </button>
            <h6 className=" mb-1 mt-2">載入問卷資料</h6>
            <div>
                <select
                    value={questionnaire}
                    onChange={(e) => {
                        setQuestionnaire(e.target.value)
                    }}
                >
                    <option value="">請選擇問卷</option>
                    {diagnosis === "Raynaud" ? (
                        <>
                            <option value="MHO">MHO</option>
                            <option value="SF36">SF36</option>
                        </>
                    ) : null}
                    {diagnosis === "AIN Compression" ? (
                        <>
                            <option value="BSRS">BSRS</option>
                            <option value="SF36">SF36</option>
                            <option value="DASH">DASH</option>
                        </>
                    ) : null}
                </select>
                {QuestionnaireData.length === 0 ? <>沒有問卷資料</> : <></>}
                {QuestionnaireData.length > 0 ? (
                    <select
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value)
                        }}
                    >
                        <option value="">請選擇日期</option>
                        {QuestionnaireData.map(({ date }) => (
                            <option value={date.toISOString().substring(0, 10)}>
                                {date.toISOString().substring(0, 10)}
                            </option>
                        ))}
                    </select>
                ) : (
                    <></>
                )}
            </div>
            <button
                className="btn mt-1 p-2"
                onClick={async () => {
                    const selectedRow = api.getSelectedRows()
                    if (!selectedRow) {
                        toast.error("請選擇載入位置")
                        return
                    }
                    if (!questionnaire || !selectedDate) {
                        toast.error("請選擇載入問卷或日期")
                        return
                    }
                    const selectedQuestionnaireData = QuestionnaireData.find(
                        ({ date }) =>
                            date.toISOString().substring(0, 10) ===
                            selectedDate,
                    )
                    const { totalScore, dimensions } = scoreCalculator(
                        selectedQuestionnaireData,
                        questionnaire,
                    )
                    let promises
                    if (diagnosis === "Raynaud") {
                        promises = dimensions.map((dimension) => {
                            const { dimensionName, score } = dimension
                            const colName =
                                dimensionsToColnameMap[diagnosis][dimensionName]
                            if (!colName) {
                                return
                            }
                            return saveData({
                                rowId: selectedRow[0].id,
                                diagnosis,
                                colName,
                                value: score,
                            })
                        })
                    }
                    if (diagnosis === "AIN Compression") {
                        const questionnaireToColnameMap = {
                            BSRS: "bsrs",
                            SF36: "sf36",
                            DASH: "dash",
                        }
                        const colName = questionnaireToColnameMap[questionnaire]
                        console.log(colName)
                        promises = [
                            saveData({
                                rowId: selectedRow[0].id,
                                diagnosis,
                                colName,
                                value: totalScore,
                            }),
                        ]
                    }
                    try {
                        await Promise.all(promises)
                        toast.success("載入成功")
                    } catch (error) {
                        toast.error("載入失敗")
                        console.log(error)
                    }
                }}
            >
                載入資料
            </button>
            <Toaster />
        </>
    )
}
