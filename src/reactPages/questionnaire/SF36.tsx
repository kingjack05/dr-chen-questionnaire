import { trpc } from "../../components/trpc"
import { $setCurrentCompletedQs } from "./store"
import {
    QuestionRadio,
    type HandleRadioGroupChange,
    type QuestionGroupValueGetter,
    QuestionRadioGroup,
} from "./components"
import { useEffect } from "react"

type SF36PropType = {
    patientId: number
}
export const SF36 = ({ patientId }: SF36PropType) => {
    const SF36Response = trpc.questionnaire.responseTodayByPatient.useQuery({
        patientId,
        questionnaire: "SF36",
    })
    const responseData = SF36Response.data
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
                questionnaire: "SF36",
                date: new Date(),
            })
            .catch((e) => {
                console.log(e)
            })
        await SF36Response.refetch()
    }
    const handleQRadioChange: HandleRadioGroupChange = async (e, colName) => {
        await saveResponse
            .mutateAsync({
                colName,
                value: Number(e.target.value),
                patientId,
                questionnaire: "SF36",
                date: new Date(),
            })
            .catch((e) => {
                console.log(e)
            })
        await SF36Response.refetch()
    }

    useEffect(() => {
        // Create response if no saved result
        if (SF36Response.isFetched && !SF36Response.isError && !responseData) {
            addResponse
                .mutateAsync({
                    date: new Date(),
                    patientId,
                    questionnaire: "SF36",
                })
                .then((r) => {
                    SF36Response.refetch()
                })
                .catch((e) => {
                    console.log(e)
                })
        }
        if (!responseData) {
            return
        }
        const completedQs = Object.entries(responseData).reduce(
            (acc, curVal) => (acc <= 36 ? acc + (curVal[1] ? 1 : 0) : 36), // max 36
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
            <div className="mb-4 text-gray-300">問卷名: SF36</div>
            <QuestionRadio
                question="1. 整體上，您認為您目前的健康狀況是"
                colName="q1"
                options={["極好", "很好", "好", "普通", "不好"]}
                defaultValue={String(responseData["q1"])}
                handleChange={handleQRadioChange}
            />
            <QuestionRadio
                question="2. 和一年前比較，您認為您目前的健康狀況是"
                colName="q2"
                options={["極好", "很好", "好", "普通", "不好"]}
                defaultValue={String(responseData["q2"])}
                handleChange={handleQRadioChange}
            />
            <div className="mt-8 text-lg sm:text-2xl">日常活動</div>
            <div className="my-2 text-base sm:text-lg">
                下面是一些您日常可能從事的活動，請問您目前健康狀況會不會限制您從事這些活動？如果會，限制程度有多少？
            </div>
            <div className="ml-80 hidden items-center justify-around text-gray-500 sm:flex">
                受限制
                <svg
                    className="h-4 w-4 scale-x-[2] fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                >
                    <path d="m18 6-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z" />
                </svg>
                不受限制
            </div>
            <QuestionRadioGroup
                startingQNum={3}
                questions={[
                    "費力活動,例如跑步,提重物,參與劇烈運動",
                    "中等程度活動,例如:搬桌子,拖地板,打保齡球,或打太極拳",
                    "提起或攜帶食品雜貨 ",
                    "爬數層樓樓梯 ",
                    "爬一層樓樓梯",
                    "彎腰,跪下或蹲下",
                    "走路超過一公里(約快步走5分鐘)",
                    "走過數個街口",
                    "走過一個街口",
                    "自己洗澡或穿衣",
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
                startingQNum={13}
                questions={[
                    "因為身體健康問題，做工作或是做其他事情的時間減少(休息的時間增加)",
                    "因為身體健康問題，完成的工作量比想像或預期中的少",
                    "因為身體健康問題，可以做的工作或其他活動的種類受到限制",
                    "因為身體健康問題，做工作或是其他活動有困難(如需更吃力)",
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
                startingQNum={17}
                questions={[
                    "因為感覺心情或情緒不好，做工作或是其他活動的時間減少(休息時間增加)",
                    "因為感覺心情或情緒不好，完成的工作量比您想要完成的要較少",
                    "因為感覺心情或情緒不好，做工作或其他活動時不如以往小心(會恍神或是無法專心)",
                ]}
                options={["是", "否"]}
                handleChange={handleQRadioGroupChange}
                valueGetter={valueGetter}
                questionWidth="xl"
            />
            <div className="mt-20"></div>
            <QuestionRadio
                question="20. 在過去一個月內，您的身體健康或情緒問題，對您與家人或朋友、鄰居、社團間的平常活動的妨礙程度如何？"
                colName="q20"
                options={[
                    "完全沒有妨礙",
                    "有一點妨礙",
                    "中度妨礙",
                    "相當多妨礙",
                    "妨礙到極點",
                ]}
                defaultValue={String(responseData["q20"])}
                handleChange={handleQRadioChange}
                questionWidth="full"
            />
            <QuestionRadio
                question="21. 在過去一個月內，您身體疼痛程度有多嚴重？"
                colName="q21"
                options={[
                    "完全不痛",
                    "非常輕微的痛",
                    "輕微的痛",
                    "中度的痛",
                    "嚴重的痛",
                    "非常嚴重的痛",
                ]}
                defaultValue={String(responseData["q21"])}
                handleChange={handleQRadioChange}
                questionWidth="full"
            />
            <QuestionRadio
                question="22. 在過去一個月內，身體疼痛對您的日常工作(包括上班及家務)妨礙程度如何？"
                colName="q22"
                options={[
                    "完全沒有妨礙",
                    "有一點妨礙",
                    "中度妨礙",
                    "相當多妨礙",
                    "妨礙到極點",
                ]}
                defaultValue={String(responseData["q22"])}
                handleChange={handleQRadioChange}
                questionWidth="full"
            />
            <div className="mb-2 mt-20 text-base sm:text-lg">
                下列各項問題是關於過去一個月內您的感覺及您對周遭生活的感受，請針對每一問題選一最接近您感覺的答案。在過去一個月中有多少時候......
            </div>
            <div className="ml-96 hidden items-center justify-around text-gray-500 sm:flex">
                常常
                <svg
                    className="h-4 w-4 scale-x-[2] fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                >
                    <path d="m18 6-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z" />
                </svg>
                很少
            </div>
            <QuestionRadioGroup
                startingQNum={23}
                questions={[
                    "您覺得充滿活力",
                    "您是一個非常緊張的人",
                    "您覺得非常沮喪,沒有任何事情可以讓您高興起來",
                    "您覺得心情平靜",
                    "您精力充沛",
                    "您覺得悶悶不樂或憂鬱",
                    "您覺得筋疲力竭(身體上提不起勁)",
                    "您是一個快樂的人",
                    "您覺得累(覺得甚麼事都提不起勁)",
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
            />
            <QuestionRadio
                question="32. 在過去一個月內，您的身體健康或情緒問題有多少時候會妨礙您的社交活動（如拜訪親友等）"
                colName="q32"
                options={[
                    "一直都是",
                    "大部分時間",
                    "有時",
                    "很少",
                    "從不或完全沒有",
                ]}
                defaultValue={String(responseData["q32"])}
                handleChange={handleQRadioChange}
                questionWidth="full"
            />
            <div className="mb-2 mt-20 text-base sm:text-lg">
                下列各個陳述對您來說有多正確？
            </div>
            <div className="ml-96 hidden items-center justify-around text-gray-500 sm:flex">
                同意
                <svg
                    className="h-4 w-4 scale-x-[2] fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                >
                    <path d="m18 6-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z" />
                </svg>
                不同意
            </div>
            <QuestionRadioGroup
                startingQNum={33}
                questions={[
                    "我好像比別人容易生病",
                    "和任何一個我認識的人相比,我和他們一樣健康",
                    "我想我的健康會越來越壞",
                    "我的健康狀況好的很",
                ]}
                options={[
                    "完全正確",
                    "大部分正確",
                    "不知道",
                    "大部分不正確",
                    "完全不正確",
                ]}
                handleChange={handleQRadioGroupChange}
                valueGetter={valueGetter}
            />
        </div>
    )
}
