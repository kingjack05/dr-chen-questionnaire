import { useState } from "react"
import { QueryContextProvider } from "../../components/Providers/QueryContext"
import { MHO } from "./MHO"
import { useStore } from "@nanostores/react"
import { $currentCompletedQs } from "./store"

export const QuestionnairesPage = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const [patientId, setPatientId] = useState(queryParameters.get("id"))
    const [followingQuestionnaires, setFollowingQuestionnaires] = useState(
        queryParameters.get("followingQuestionnaires"),
    )
    const currentCompletedQs = useStore($currentCompletedQs)
    const totalQs = 56
    const completePercentage = Math.floor((100 * currentCompletedQs) / totalQs)

    return (
        <QueryContextProvider>
            <div className="mx-2 sm:mx-auto sm:max-w-3xl sm:text-xl">
                <div className="my-4 hidden text-sm text-gray-300 sm:block">
                    感謝您的耐心，您的填答將有助於病情的追蹤
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                    }}
                >
                    <MHO patientId={Number(patientId)} />
                    <div className="fixed bottom-0 left-0 h-24 w-full bg-gray-100 py-6">
                        <div className="flex sm:mx-auto sm:max-w-3xl">
                            <div className="flex-grow">
                                <div className=" text-sm">進度</div>
                                <div className="flex py-1">
                                    <div
                                        className="h-2 bg-blue-600"
                                        style={{
                                            width: 2.4 * completePercentage,
                                        }}
                                    ></div>
                                    <div
                                        className="h-2 bg-gray-200"
                                        style={{
                                            width:
                                                2.4 *
                                                (100 - completePercentage),
                                        }}
                                    ></div>
                                </div>
                                <div className=" text-xs text-gray-500">
                                    {completePercentage}%
                                </div>
                            </div>
                            <div>
                                <button className="btn mt-3" type="submit">
                                    提交
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </QueryContextProvider>
    )
}
