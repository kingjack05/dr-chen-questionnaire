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
export const BSRS = ({ patientId }: PropType) => {
    const BSRSResponse = trpc.questionnaire.responseTodayByPatient.useQuery({
        patientId,
        questionnaire: "BSRS",
    })
    const numberOfQuestions = 30
    const responseData = BSRSResponse.data
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
                questionnaire: "BSRS",
                date: new Date(),
            })
            .catch((e) => {
                console.log(e)
            })
        await BSRSResponse.refetch()
    }

    useEffect(() => {
        // Create response if no saved result
        if (BSRSResponse.isFetched && !BSRSResponse.isError && !responseData) {
            addResponse
                .mutateAsync({
                    date: new Date(),
                    patientId,
                    questionnaire: "BSRS",
                })
                .then((r) => {
                    BSRSResponse.refetch()
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
                問卷名: Brief Symptom Rating Scale
            </div>
            <div className="mb-2 text-gray-500">
                下面所列舉的問題是一般人有時候會有的問題，請您仔細地閱讀每一個問題，同時回想在最近一星期中(包括今天)，這些問題使您感到困擾或苦惱的程度，然後圈選一個您認為最能代表您感覺的答案
            </div>
            <div className="ml-80 hidden items-center justify-around text-gray-500 sm:flex">
                沒有症狀
                <svg
                    className="h-4 w-4 scale-x-[2] fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                >
                    <path d="m18 6-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z" />
                </svg>
                症狀嚴重
            </div>
            <QuestionRadioGroup
                startingQNum={1}
                questions={[
                    "神經過敏(緊張)或內心不安",
                    "不愉快的念頭或字語反覆出現，無法從心中排除",
                    "擔心不夠整潔或不夠小心",
                    "在空曠的地方或街上，有害怕的感覺",
                    "有自殺的想法",
                    "胃口不好(食慾不振)",
                    "容易發脾氣而無法控制",
                    "單獨離開家時覺得害怕",
                    "感覺憂鬱、心情低落",
                    "對一般的事物失去興趣",
                    "肌肉酸痛(譬如頭、頸、腰、背等部位)",
                    "覺得別人在注視或談論自己",
                    "睡眠困難，譬如難以入睡、易醒或早醒",
                    "必須一再地重複檢查所做的事情或必須一再地重複做同樣的動作，如洗手、關門",
                    "呼吸困難",
                    "對某些事情、地點或活動懼怕，而不得不避開",
                    "身體某些部位覺得麻木或刺痛",
                    "覺得將來沒有希望",
                    "身體某些部位覺得無力",
                    "當人家注視或談論自己時，有不安的感覺",
                    "具有想要毆打或傷害某人的衝動",
                    "具有想要打破或打碎東西的衝動",
                    "和別人在一起時，(因自以為被注意)有不自然的感覺",
                    "一陣一陣地感到恐怖或恐慌",
                    "單獨一個人的時候覺得不安",
                    "覺得別人不相信自己的成就",
                    "覺得很不安，以致於無法安靜坐下來",
                    "覺得自己沒有價值",
                    "覺得即將有不幸的事情要發生在自己身上",
                    "具有可怕的念頭或影像",
                ]}
                options={["完全沒有", "輕微", "中等程度", "厲害", "非常厲害"]}
                handleChange={handleQRadioGroupChange}
                valueGetter={valueGetter}
            />
        </div>
    )
}
