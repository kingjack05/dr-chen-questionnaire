import { useState } from "react"
import { useStore } from "@nanostores/react"

import { QueryContextProvider } from "../../components/Providers/QueryContext"
import { $currentCompletedQs } from "./store"
import { MHO } from "./MHO"
import { SF36 } from "./SF36"
import { SF12 } from "./SF12"
import { BCT } from "./BCT"
import { WHOQOLbref } from "./WHOQOLbref"
import { BSRS } from "./BSRS"
import { DASH } from "./DASH"
import { QDASH } from "./QDASH"

export const QuestionnairesPage = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const [patientId] = useState(queryParameters.get("id"))
    const [followingQuestionnaires] = useState(
        queryParameters.get("followingQuestionnaires")?.split(" ") ?? [],
    )
    const [questionnaireIndex, setQuestionnaireIndex] = useState(0)
    const currentQuestionnaire = followingQuestionnaires[questionnaireIndex]

    const totalQsMap: { [questionnaire: string]: number } = {
        MHO: 56,
        SF36: 36,
        SF12: 0,
        BCT: 0,
        WHOQOLbref: 0,
        BSRS: 0,
        DASH: 0,
        qDASH: 0,
    }
    const currentCompletedQs =
        followingQuestionnaires.reduce(
            (acc, curVal, curIdx) =>
                curIdx < questionnaireIndex ? acc + totalQsMap[curVal] : acc,
            0,
        ) + useStore($currentCompletedQs)
    const totalQs = followingQuestionnaires.reduce(
        (acc, curVal) => acc + totalQsMap[curVal],
        0,
    )
    const completePercentage = Math.floor((100 * currentCompletedQs) / totalQs)

    const QuestionnaireMapper: { [questionnaire: string]: JSX.Element } = {
        MHO: <MHO patientId={Number(patientId)} />,
        SF36: <SF36 />,
        SF12: <SF12 />,
        BCT: <BCT />,
        WHOQOLbref: <WHOQOLbref />,
        BSRS: <BSRS />,
        DASH: <DASH />,
        qDASH: <QDASH />,
    }

    return (
        <QueryContextProvider>
            <div className="mx-2 sm:mx-auto sm:max-w-3xl sm:text-xl">
                <div className="my-4 hidden text-sm text-gray-300 sm:block">
                    感謝您的耐心，您的填答將有助於病情的追蹤
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (
                            questionnaireIndex ===
                            followingQuestionnaires.length - 1
                        ) {
                            return
                        }

                        setQuestionnaireIndex(questionnaireIndex + 1)
                    }}
                >
                    {QuestionnaireMapper[currentQuestionnaire]}
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
                            <div className="flex items-center">
                                <button className="btn mt-1" type="submit">
                                    {questionnaireIndex + 1 <
                                    followingQuestionnaires.length
                                        ? "下一頁"
                                        : "提交"}
                                </button>
                                <div className="ml-4 text-sm text-gray-500">
                                    ({questionnaireIndex + 1}/
                                    {followingQuestionnaires.length})
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </QueryContextProvider>
    )
}
