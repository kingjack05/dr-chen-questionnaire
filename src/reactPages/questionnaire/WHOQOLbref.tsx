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
export const WHOQOLbref = ({ patientId }: PropType) => {
    const WHOQOLbrefResponse =
        trpc.questionnaire.responseTodayByPatient.useQuery({
            patientId,
            questionnaire: "WHOQOLbref",
        })
    const numberOfQuestions = 28
    const responseData = WHOQOLbrefResponse.data
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
                questionnaire: "WHOQOLbref",
                date: new Date(),
            })
            .catch((e) => {
                console.log(e)
            })
        await WHOQOLbrefResponse.refetch()
    }
    const handleQRadioChange: HandleRadioGroupChange = async (e, colName) => {
        await saveResponse
            .mutateAsync({
                colName,
                value: Number(e.target.value),
                patientId,
                questionnaire: "WHOQOLbref",
                date: new Date(),
            })
            .catch((e) => {
                console.log(e)
            })
        await WHOQOLbrefResponse.refetch()
    }

    useEffect(() => {
        // Create response if no saved result
        if (
            WHOQOLbrefResponse.isFetched &&
            !WHOQOLbrefResponse.isError &&
            !responseData
        ) {
            addResponse
                .mutateAsync({
                    date: new Date(),
                    patientId,
                    questionnaire: "WHOQOLbref",
                })
                .then((r) => {
                    WHOQOLbrefResponse.refetch()
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
            <div className="mb-4 text-gray-300">
                問卷名: WHOQOLbref (Quality of Life)
            </div>
            <QuestionRadio
                question="1. 整體來說，您如何評價您的生活品質？"
                colName="q1"
                options={["極不好", "不好", "普通", "好", "極好"]}
                defaultValue={String(responseData["q1"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="2. 整體來說，您滿意自己的健康嗎?"
                colName="q2"
                options={["極不滿意", "不滿意", "普通", "滿意", "極滿意"]}
                defaultValue={String(responseData["q2"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="3. 您覺得身體疼痛會妨礙您處理需要做的事情嗎？"
                colName="q3"
                options={[
                    "完全沒有妨礙",
                    "有一點妨礙",
                    "中等程度妨礙",
                    "很妨礙",
                    "極妨礙",
                ]}
                defaultValue={String(responseData["q3"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="4. 您需要靠醫療的幫助應付日常生活嗎?"
                colName="q4"
                options={[
                    "完全沒有需要",
                    "有一點需要",
                    "中等程度需要",
                    "很需要",
                    "極需要",
                ]}
                defaultValue={String(responseData["q4"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="5. 您享受生活嗎？"
                colName="q5"
                options={[
                    "完全不享受",
                    "有一點享受",
                    "中等程度享受",
                    "很享受",
                    "極享受",
                ]}
                defaultValue={String(responseData["q5"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="6. 您覺得自己的生命有意義嗎？"
                colName="q6"
                options={["完全沒有", "有一點有", "中等程度有", "很有", "極有"]}
                defaultValue={String(responseData["q6"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="7. 您集中精神的能力有多好？"
                colName="q7"
                options={["極不好", "不好", "普通", "好", "極好"]}
                defaultValue={String(responseData["q7"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="8. 在日常生活中，您感到安全嗎?"
                colName="q8"
                options={[
                    "完全不安全",
                    "有一點安全",
                    "中等程度安全",
                    "很安全",
                    "極安全",
                ]}
                defaultValue={String(responseData["q8"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="9. 您所處的環境健康嗎? (如污染、噪音、氣候、景觀)"
                colName="q9"
                options={[
                    "完全不健康",
                    "有一點健康",
                    "中等程度健康",
                    "很健康",
                    "極健康",
                ]}
                defaultValue={String(responseData["q9"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="10. 您每天的生活有足夠的精力嗎? "
                colName="q10"
                options={[
                    "完全不足夠",
                    "少許足夠",
                    "中等程度足夠",
                    "很足夠",
                    "完全足夠",
                ]}
                defaultValue={String(responseData["q10"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="11. 您能接受自己的外表嗎?"
                colName="q11"
                options={[
                    "完全不能夠",
                    "少許能夠",
                    "中等程度能夠",
                    "很能夠",
                    "完全能夠",
                ]}
                defaultValue={String(responseData["q11"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="12. 您有足夠的金錢應付所需嗎?"
                colName="q12"
                options={[
                    "完全不足夠",
                    "少許足夠",
                    "中等程度足夠",
                    "很足夠",
                    "完全足夠",
                ]}
                defaultValue={String(responseData["q12"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="13. 您能方便得到每日生活所需的資訊嗎？"
                colName="q13"
                options={[
                    "完全不方便",
                    "少許方便",
                    "中等程度方便",
                    "很方便",
                    "完全方便",
                ]}
                defaultValue={String(responseData["q13"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="14. 您有機會從事休閒活動嗎?"
                colName="q14"
                options={[
                    "完全沒有機會",
                    "少許機會",
                    "中等程度機會",
                    "很有機會",
                    "完全有機會",
                ]}
                defaultValue={String(responseData["q14"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="15. 您四處行動的能力好嗎？"
                colName="q15"
                options={["極不好", "不好", "普通", "好", "極好"]}
                defaultValue={String(responseData["q15"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <div className="mt-8 text-lg sm:text-2xl">生活滿意度</div>
            <div className="ml-80 hidden items-center justify-around text-gray-500 sm:flex">
                滿意
                <svg
                    className="h-4 w-4 scale-x-[2] fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                >
                    <path d="m18 6-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z" />
                </svg>
                不滿意
            </div>
            <QuestionRadioGroup
                startingQNum={16}
                questions={[
                    "您滿意自己的睡眠狀況嗎?",
                    "您滿意自己從事日常活動的能力嗎?",
                    "您滿意自己的工作能力嗎？",
                    "您對自己滿意嗎?",
                    "您滿意自己的人際關係嗎?",
                    "您滿意自己的性生活嗎?",
                    "您滿意朋友給您的支持嗎?",
                    "您滿意自己住所的狀況嗎?",
                    "您滿意醫療保健服務的方便程度嗎？",
                    "您滿意所使用的交通運輸方式嗎？",
                ]}
                options={["極不滿意", "不滿意", "中等滿意", "滿意", "極滿意"]}
                handleChange={handleQRadioGroupChange}
                valueGetter={valueGetter}
            />
            <QuestionRadio
                question="26. 您常有負面的感受嗎？（如傷心、緊張、焦慮、憂鬱等）"
                colName="q26"
                options={[
                    "從來沒有",
                    "不常有",
                    "一半有一半沒有",
                    "很常有",
                    "一直都有",
                ]}
                defaultValue={String(responseData["q26"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="27. 您覺得自己有面子或被尊重嗎？"
                colName="q27"
                options={["完全沒有", "有一點", "中等程度有", "很有", "極有"]}
                defaultValue={String(responseData["q27"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="28. 您想吃的食物通常都能吃到嗎？"
                colName="q28"
                options={[
                    "從來沒有",
                    "不常有",
                    "一半有一半沒有",
                    "很常有",
                    "一直都有",
                ]}
                defaultValue={String(responseData["q28"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
        </div>
    )
}
