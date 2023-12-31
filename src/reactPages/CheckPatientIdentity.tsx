import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

import { trpc } from "../components/trpc"
import { QueryContextProvider } from "../components/Providers/QueryContext"

export const CheckPatientIdentityPageWithoutProvider = () => {
    const [name, setName] = useState("")
    const [bdayYear, setBdayYear] = useState("65")
    const [bdayMonth, setBdayMonth] = useState("6")
    const [bdayDay, setBdayDay] = useState("4")
    const [errMsg, setErrMsg] = useState("")

    const getPatient = trpc.patient.patientByNameAndBDay.useMutation()

    return (
        <div className="flex h-screen items-center justify-center">
            <div>
                <div className=" mb-16 text-sm text-gray-400">
                    陳思恆醫師問卷系統
                </div>
                <div className=" w-80 rounded border border-gray-300">
                    <div className=" mb-12 ml-8 mt-10 text-xl">
                        請輸入您的姓名和生日:
                    </div>
                    <div className=" ml-8">
                        <div className=" text-gray-400">姓名</div>
                        <input
                            autoFocus
                            type="text"
                            className=" input mb-5 w-48 text-2xl"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                        <div className=" text-gray-400">生日 (民國)</div>
                        <div className=" mt-2 flex">
                            <input
                                type="number"
                                className="input w-12 text-center text-xl"
                                value={bdayYear}
                                onChange={(e) => {
                                    setBdayYear(e.target.value)
                                }}
                            />
                            <div className="mx-4">/</div>
                            <input
                                type="number"
                                className="input w-12 text-center text-xl"
                                value={bdayMonth}
                                onChange={(e) => {
                                    setBdayMonth(e.target.value)
                                }}
                            />
                            <div className="mx-4">/</div>
                            <input
                                type="number"
                                className="input w-12 text-center text-xl"
                                value={bdayDay}
                                onChange={(e) => {
                                    setBdayDay(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                    <div className="mb-8 mr-6 mt-16 flex flex-row-reverse">
                        <button
                            className="btn"
                            onClick={async () => {
                                try {
                                    const month =
                                        bdayMonth.length === 2
                                            ? bdayMonth
                                            : `0${bdayMonth}`
                                    const day =
                                        bdayDay.length === 2
                                            ? bdayDay
                                            : `0${bdayDay}`
                                    const bday = new Date(
                                        `${String(
                                            Number(bdayYear) + 1911,
                                        )}-${month}-${day}T08:00:00.000+08:00`,
                                    )
                                    const result = await getPatient.mutateAsync(
                                        {
                                            name,
                                            bday,
                                        },
                                    )
                                    if (!result) {
                                        toast.error("登入失敗")
                                        setErrMsg("登入失敗")
                                        return
                                    }
                                    toast.success("登入成功")
                                    window.location.href = `/questionnaires?id=${
                                        result.id
                                    }&followingQuestionnaires=${result.followingQuestionnaires?.join(
                                        "+",
                                    )}`
                                    console.log(result)
                                } catch (error) {
                                    toast.error("登入失敗")
                                    setErrMsg(JSON.stringify(error))
                                    console.log(error)
                                }
                            }}
                        >
                            提交
                        </button>
                    </div>
                </div>
                <div className="max-w-sm overflow-auto text-red-400">
                    {errMsg}
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export const CheckPatientIdentityPage = () => {
    return (
        <QueryContextProvider>
            <CheckPatientIdentityPageWithoutProvider />
        </QueryContextProvider>
    )
}
