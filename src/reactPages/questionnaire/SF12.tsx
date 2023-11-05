import { trpc } from "../../components/trpc"
import { $setCurrentCompletedQs } from "./store"
import {
    QuestionRadio,
    type HandleRadioGroupChange,
    type QuestionGroupValueGetter,
    QuestionRadioGroup,
} from "./components"
import { useEffect } from "react"

type PropType = {
    patientId: number
}
export const SF12 = ({ patientId }: PropType) => {
    const SF12Response = trpc.questionnaire.responseTodayByPatient.useQuery({
        patientId,
        questionnaire: "SF12",
    })
    const numberOfQuestions = 12
    const responseData = SF12Response.data
    const valueGetter: QuestionGroupValueGetter = (qNum) =>
        //@ts-ignore
        responseData ? String(responseData[`q${qNum}`]) ?? "" : ""

    const addResponse = trpc.questionnaire.addResponse.useMutation()
    const saveResponse = trpc.questionnaire.saveResponse.useMutation()
    const handleQRadioGroupChange: HandleRadioGroupChange = async (e, qNum) => {
        await saveResponse
            .mutateAsync({
                colName: `q${qNum}`,
                value: Number(e.target.value),
                patientId,
                questionnaire: "SF12",
                date: new Date(),
            })
            .catch((e) => {
                console.log(e)
            })
        await SF12Response.refetch()
    }
    const handleQRadioChange: HandleRadioGroupChange = async (e, colName) => {
        await saveResponse
            .mutateAsync({
                colName,
                value: Number(e.target.value),
                patientId,
                questionnaire: "SF12",
                date: new Date(),
            })
            .catch((e) => {
                console.log(e)
            })
        await SF12Response.refetch()
    }

    useEffect(() => {
        // Create response if no saved result
        if (SF12Response.isFetched && !SF12Response.isError && !responseData) {
            addResponse
                .mutateAsync({
                    date: new Date(),
                    patientId,
                    questionnaire: "SF12",
                })
                .then((r) => {
                    SF12Response.refetch()
                })
                .catch((e) => {
                    console.log(e)
                })
        }
        if (!responseData) {
            return
        }
        const completedQs = Object.entries(responseData).reduce(
            (acc, curVal) =>
                acc <= numberOfQuestions
                    ? acc + (curVal[1] ? 1 : 0)
                    : numberOfQuestions, // max
            -3, //exclude id, date and patientId
        )
        $setCurrentCompletedQs(completedQs)
        return () => {}
    }, [responseData])
    if (!responseData) {
        return <>載入資料中，請稍後...</>
    }
    return (
        <div className="mb-40">
            <QuestionRadio
                question="1. 整體上，您認為您目前的健康狀況是"
                colName="q1"
                options={["極好", "很好", "好", "普通", "不好"]}
                defaultValue={String(responseData["q1"])}
                handleChange={handleQRadioChange}
            />
            <div className="mt-8 text-lg sm:text-2xl">日常活動</div>
            <div className="my-2 text-base sm:text-lg">
                下面是一些您日常可能從事的活動，請問您目前健康狀況會不會限制您從事這些活動？如果會，限制程度有多少？
            </div>
            <QuestionRadioGroup
                startingQNum={2}
                questions={[
                    "中等程度活動,例如:搬桌子,拖地板,打保齡球,或打太極拳",
                    "爬數層樓樓梯 ",
                ]}
                options={["會受很多限制", "會受一些限制", "完全不受限制"]}
                handleChange={handleQRadioGroupChange}
                valueGetter={valueGetter}
            />
            <div className="mt-8 text-lg sm:text-2xl">身體健康的影響</div>
            <div className="my-2 text-base sm:text-lg">
                在過去一個月內，您是否曾因為身體健康問題，而在工作上或其他日常活動方面有下列任何的問題？
            </div>
            <QuestionRadioGroup
                startingQNum={4}
                questions={[
                    "因為身體健康問題，做工作或是做其他事情的時間減少",
                    "因為身體健康問題，可以做的工作或其他活動的種類受到限制",
                ]}
                options={["是", "否"]}
                handleChange={handleQRadioGroupChange}
                valueGetter={valueGetter}
                questionWidth="xl"
            />
            <div className="mt-8 text-lg sm:text-2xl">情緒問題的影響</div>
            <div className="my-2 text-base sm:text-lg">
                在過去一個月內，您是否曾因為情緒問題(例如，感覺沮喪或焦慮)，而在工作上或其他日常活動方面有下列的問題?
            </div>
            <QuestionRadioGroup
                startingQNum={6}
                questions={[
                    "因為心情不好而令您在工作或日常活動中實際做完/完成的事情比想做的少",
                    "因為心情不好而不像往常一樣投入工作或其他原本規律的身體活動",
                ]}
                options={["是", "否"]}
                handleChange={handleQRadioGroupChange}
                valueGetter={valueGetter}
                questionWidth="xl"
            />
            <QuestionRadio
                question="8. 在過去一個月內，身體疼痛對您的日常工作(包括上班及家務)妨礙程度如何？"
                colName="q8"
                options={[
                    "完全沒有妨礙",
                    "有一點妨礙",
                    "中度妨礙",
                    "相當多妨礙",
                    "妨礙到極點",
                ]}
                defaultValue={String(responseData["q8"])}
                handleChange={handleQRadioChange}
                questionWidth="full"
            />
            <div className="mb-2 mt-20 text-base sm:text-lg">
                下列各項問題是關於過去一個月內您的感覺及您對周遭生活的感受，請針對每一問題選一最接近您感覺的答案。在過去一個月中有多少時候......
            </div>
            <QuestionRadioGroup
                startingQNum={9}
                questions={[
                    "您覺得心情平靜",
                    "您精力充沛",
                    "您覺得悶悶不樂或憂鬱",
                ]}
                options={[
                    "一直都是",
                    "大部分時間",
                    "經常",
                    "有時",
                    "很少",
                    "從不或完全沒有",
                ]}
                handleChange={handleQRadioGroupChange}
                valueGetter={valueGetter}
                questionWidth="lg"
            />
            <QuestionRadio
                question="12. 在過去一個月內，您的身體健康或情緒問題有多少時候會妨礙您的社交活動?（如拜訪親友等）"
                colName="q12"
                options={[
                    "一直都是",
                    "大部分時間",
                    "有時",
                    "很少",
                    "從不或完全沒有",
                ]}
                defaultValue={String(responseData["q12"])}
                handleChange={handleQRadioChange}
                questionWidth="full"
            />
        </div>
    )
}
