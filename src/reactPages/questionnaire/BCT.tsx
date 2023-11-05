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
export const BCT = ({ patientId }: PropType) => {
    const BCTResponse = trpc.questionnaire.responseTodayByPatient.useQuery({
        patientId,
        questionnaire: "BCT",
    })
    const numberOfQuestions = 19
    const responseData = BCTResponse.data
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
                questionnaire: "BCT",
                date: new Date(),
            })
            .catch((e) => {
                console.log(e)
            })
        await BCTResponse.refetch()
    }
    const handleQRadioChange: HandleRadioGroupChange = async (e, colName) => {
        await saveResponse
            .mutateAsync({
                colName,
                value: Number(e.target.value),
                patientId,
                questionnaire: "BCT",
                date: new Date(),
            })
            .catch((e) => {
                console.log(e)
            })
        await BCTResponse.refetch()
    }

    useEffect(() => {
        // Create response if no saved result
        if (BCTResponse.isFetched && !BCTResponse.isError && !responseData) {
            addResponse
                .mutateAsync({
                    date: new Date(),
                    patientId,
                    questionnaire: "BCT",
                })
                .then((r) => {
                    BCTResponse.refetch()
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
            <div className="mb-2 mt-8 text-lg sm:text-2xl">症狀嚴重程度</div>
            <div className="mb-2 text-gray-500">
                請依據過去兩週內，每天24小時中產生的症狀回答
            </div>
            <QuestionRadio
                question="1. 您在半夜時，手或手腕疼痛的程度?"
                colName="q1"
                options={[
                    "我的手或手腕沒有半夜疼痛",
                    "輕微的疼痛",
                    "中等的疼痛",
                    "嚴重的疼痛",
                    "非常嚴重的疼痛",
                ]}
                defaultValue={String(responseData["q1"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="2. 過去兩個星期內，您平時一個晚上多常因為半夜手或手腕疼痛醒來?"
                colName="q2"
                options={[
                    "從來沒有",
                    "一次",
                    "兩次或三次",
                    "四次或五次",
                    "大於五次",
                ]}
                defaultValue={String(responseData["q2"])}
                handleChange={handleQRadioChange}
                questionWidth="full"
            />
            <div className="mt-6"></div>
            <QuestionRadio
                question="3. 您平時在白天會手或手腕疼痛嗎?"
                colName="q3"
                options={[
                    "我在白天不會疼痛",
                    "我在白天會輕微疼痛",
                    "我在白天會中度疼痛",
                    "我在白天會嚴重疼痛",
                    "我在白天會非常嚴重疼痛",
                ]}
                defaultValue={String(responseData["q3"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="4. 您多常在白天出現手或手腕疼痛嗎?"
                colName="q4"
                options={[
                    "從來沒有",
                    "一天一次或兩次",
                    "一天三次至五次",
                    "一天大於五次",
                    "整天都在痛",
                ]}
                defaultValue={String(responseData["q4"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="5. 白天出現疼痛，平均每次會持續多久?"
                colName="q5"
                options={[
                    "從來沒有",
                    "少於10分鐘",
                    "10到60分鐘",
                    "大於60分鐘",
                    "整天都在痛",
                ]}
                defaultValue={String(responseData["q5"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="6. 您的手會感覺麻木(失去感覺)嗎?"
                colName="q6"
                options={[
                    "不會",
                    "輕微感覺麻木",
                    "中度感覺麻木",
                    "嚴重感覺麻木",
                    "非常嚴重感覺麻木",
                ]}
                defaultValue={String(responseData["q6"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="7. 您的手或手腕會無力嗎?"
                colName="q7"
                options={[
                    "不會無力",
                    "輕微無力",
                    "中度無力",
                    "嚴重無力",
                    "非常嚴重無力",
                ]}
                defaultValue={String(responseData["q7"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="8. 您的手會有刺痛感嗎?"
                colName="q8"
                options={[
                    "沒有刺痛感",
                    "輕微刺痛感",
                    "中度刺痛感",
                    "嚴重刺痛感",
                    "非常嚴重刺痛感",
                ]}
                defaultValue={String(responseData["q8"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="9. 在半夜出現感覺麻木(失去感覺)或刺痛感有多嚴重?"
                colName="q9"
                options={[
                    "沒有感覺麻木或刺痛感",
                    "輕微",
                    "中度",
                    "嚴重",
                    "非常嚴重",
                ]}
                defaultValue={String(responseData["q9"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="10. 過去兩星期內，您平時一個晚上多常因為半夜出現感覺麻木或刺痛感而醒過來?"
                colName="q10"
                options={[
                    "從來沒有",
                    "輕微刺痛感",
                    "中度刺痛感",
                    "嚴重刺痛感",
                    "非常嚴重刺痛感",
                ]}
                defaultValue={String(responseData["q10"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <QuestionRadio
                question="11. 您抓握和使用小東西，如鑰匙或拿筆或拿碗筷，會有困難嗎?"
                colName="q11"
                options={[
                    "沒有困難",
                    "輕微困難",
                    "中度困難",
                    "嚴重困難",
                    "非常嚴重困難",
                ]}
                defaultValue={String(responseData["q11"])}
                handleChange={handleQRadioChange}
                optionLayout="col"
            />
            <div className="mt-8 text-lg sm:text-2xl">功能狀態</div>
            <div className="ml-80 hidden items-center justify-around text-gray-500 sm:flex">
                做得到
                <svg
                    className="h-4 w-4 scale-x-[2] fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                >
                    <path d="m18 6-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z" />
                </svg>
                做不到
            </div>
            <QuestionRadioGroup
                startingQNum={12}
                questions={[
                    "寫字",
                    "扣衣服扣子",
                    "拿著書本閱讀",
                    "握著電話話筒",
                    "打開寬口的瓶罐",
                    "家事打理",
                    "提購物袋",
                    "洗澡和穿衣服",
                ]}
                options={[
                    "沒有困難",
                    "輕微困難",
                    "中度困難",
                    "嚴重困難",
                    "完全做不到",
                ]}
                handleChange={handleQRadioGroupChange}
                valueGetter={valueGetter}
            />
        </div>
    )
}
