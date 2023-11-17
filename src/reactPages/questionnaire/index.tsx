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
import { trpc } from "../../components/trpc"

export const QuestionnairesPageWithoutProvider = () => {
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
        SF12: 12,
        BCT: 19,
        WHOQOLbref: 28,
        BSRS: 30,
        DASH: 36,
        qDASH: 17,
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
        SF36: <SF36 patientId={Number(patientId)} />,
        SF12: <SF12 patientId={Number(patientId)} />,
        BCT: <BCT patientId={Number(patientId)} />,
        WHOQOLbref: <WHOQOLbref patientId={Number(patientId)} />,
        BSRS: <BSRS patientId={Number(patientId)} />,
        DASH: <DASH patientId={Number(patientId)} />,
        qDASH: <QDASH patientId={Number(patientId)} />,
    }

    const saveResponse = trpc.questionnaire.saveResponse.useMutation()

    return (
        <div className="m-2 max-w-full sm:mx-auto sm:max-w-3xl sm:text-xl">
            <div className="my-4 hidden text-sm text-gray-300 sm:block">
                感謝您的耐心，您的填答將有助於病情的追蹤
            </div>
            <form
                onSubmit={async (e) => {
                    e.preventDefault()
                    await saveResponse.mutateAsync({
                        colName: "done",
                        value: true,
                        patientId: Number(patientId),
                        questionnaire: currentQuestionnaire,
                        date: new Date(),
                    })
                    if (
                        questionnaireIndex ===
                        followingQuestionnaires.length - 1
                    ) {
                        window.location.href = "/thanks"
                        return
                    }
                    setQuestionnaireIndex(questionnaireIndex + 1)
                }}
            >
                {QuestionnaireMapper[currentQuestionnaire]}
                <div className="fixed bottom-0 left-0 h-20 w-full bg-gray-100 px-2 py-4 sm:h-24 sm:py-6">
                    <div className="flex sm:mx-auto sm:max-w-3xl">
                        <div className="flex-grow">
                            <div className=" text-sm">進度</div>
                            <div className="flex py-1">
                                <div
                                    className="h-2 bg-blue-600"
                                    style={{
                                        width: 2 * completePercentage,
                                    }}
                                ></div>
                                <div
                                    className="h-2 bg-gray-200"
                                    style={{
                                        width: 2 * (100 - completePercentage),
                                    }}
                                ></div>
                            </div>
                            <div className=" text-xs text-gray-500">
                                {completePercentage < 100
                                    ? completePercentage
                                    : 100}
                                %
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="btn mt-1" type="submit">
                                {questionnaireIndex + 1 <
                                followingQuestionnaires.length
                                    ? "下一頁"
                                    : "提交"}
                            </button>
                            <div className=" ml-2 text-sm text-gray-500 sm:ml-4">
                                ({questionnaireIndex + 1}/
                                {followingQuestionnaires.length})
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export const QuestionnairesPage = () => {
    return (
        <QueryContextProvider>
            <QuestionnairesPageWithoutProvider />
        </QueryContextProvider>
    )
}
