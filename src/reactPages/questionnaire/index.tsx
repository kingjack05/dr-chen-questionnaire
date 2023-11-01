import { useState } from "react"
import { QueryContextProvider } from "../../components/Providers/QueryContext"
import { MHO } from "./MHO"

export const QuestionnairesPage = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const [patientId, setPatientId] = useState(queryParameters.get("id"))
    const [followingQuestionnaires, setFollowingQuestionnaires] = useState(
        queryParameters.get("followingQuestionnaires"),
    )

    return (
        <QueryContextProvider>
            <div className="mx-2 sm:mx-auto sm:max-w-3xl sm:text-xl">
                <div className="my-4 hidden text-sm text-gray-300 sm:block">
                    感謝您的耐心，您的填答將有助於病情的追蹤
                </div>
                <MHO patientId={Number(patientId)} />
            </div>
            <div className="fixed bottom-0 left-0 h-24 w-full bg-gray-100 py-6">
                <div className="flex sm:mx-auto sm:max-w-3xl">
                    <div className="flex-grow">
                        <div className=" text-sm">進度</div>
                        <div className="flex py-1">
                            <div className=" h-2 w-36 bg-blue-600"></div>
                            <div className=" h-2 w-24 bg-gray-200"></div>
                        </div>
                        <div className=" text-xs text-gray-500">66%</div>
                    </div>
                    <div>
                        <button className="btn mt-3">提交</button>
                    </div>
                </div>
            </div>
        </QueryContextProvider>
    )
}
