import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

import { trpc } from "../components/trpc"
import { QueryContextProvider } from "../components/Providers/QueryContext"

export const CheckPatientIdentityPageWithoutProvider = () => {
    const [name, setName] = useState("")
    const [bday, setBday] = useState("1990-06-01")
    const [errMsg, setErrMsg] = useState("")

    const getPatient = trpc.patient.patientByNameAndBDay.useMutation()

    return (
        <div className="flex h-screen items-center justify-center">
            <div>
                <div className=" mb-16 text-sm text-gray-400">
                    陳思恆醫師問卷系統
                </div>
                <div className=" w-80 rounded border border-gray-300">
                    <div className=" mb-20 ml-8 mt-10 text-xl">
                        請輸入您的姓名和生日:
                    </div>
                    <div className=" ml-8">
                        <input
                            autoFocus
                            type="text"
                            className=" input mb-5 w-48 text-2xl"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                        <input
                            type="date"
                            value={bday}
                            onChange={(e) => {
                                setBday(e.target.value)
                            }}
                            className="text-xl"
                        />
                    </div>
                    <div className="mb-8 mr-6 mt-16 flex flex-row-reverse">
                        <button
                            className="btn"
                            onClick={async () => {
                                try {
                                    const result = await getPatient.mutateAsync(
                                        {
                                            name,
                                            bday: new Date(bday),
                                        },
                                    )
                                    if (!result) {
                                        toast.error("登入失敗")
                                        setErrMsg("登入失敗")
                                        return
                                    }
                                    toast.success("登入成功")
                                    window.open(
                                        `/questionnaires?id=${
                                            result.id
                                        }&followingQuestionnaires=${result.followingQuestionnaires?.join(
                                            "+",
                                        )}`,
                                    )
                                    console.log(result)
                                } catch (error) {
                                    setErrMsg(JSON.stringify(error))
                                    console.log(error)
                                }
                            }}
                        >
                            提交
                        </button>
                    </div>
                </div>
                <div className="text-red-400">{errMsg}</div>
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
