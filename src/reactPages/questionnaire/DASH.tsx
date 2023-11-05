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
export const DASH = ({ patientId }: PropType) => {
    const DASHResponse = trpc.questionnaire.responseTodayByPatient.useQuery({
        patientId,
        questionnaire: "DASH",
    })
    const numberOfQuestions = 36
    const responseData = DASHResponse.data
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
                questionnaire: "DASH",
                date: new Date(),
            })
            .catch((e) => {
                console.log(e)
            })
        await DASHResponse.refetch()
    }
    const handleQRadioChange: HandleRadioGroupChange = async (e, colName) => {
        await saveResponse
            .mutateAsync({
                colName,
                value: Number(e.target.value),
                patientId,
                questionnaire: "DASH",
                date: new Date(),
            })
            .catch((e) => {
                console.log(e)
            })
        await DASHResponse.refetch()
    }

    useEffect(() => {
        // Create response if no saved result
        if (DASHResponse.isFetched && !DASHResponse.isError && !responseData) {
            addResponse
                .mutateAsync({
                    date: new Date(),
                    patientId,
                    questionnaire: "DASH",
                })
                .then((r) => {
                    DASHResponse.refetch()
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
            <div className="mb-2 mt-8 text-lg sm:text-2xl">活動能力</div>
            <div className="mb-2 text-gray-500">
                請評估您過去一星期內從事下列活動的能力
            </div>
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
                startingQNum={1}
                questions={[
                    "打開緊閉或新的瓶罐",
                    "書寫",
                    "轉動鑰匙",
                    "準備三餐",
                    "推開厚重的門",
                    "將東西放在高於頭部的架子上",
                    "從事費力的家務（如清洗牆壁、地板）",
                    "從事園藝或整理院子",
                    "整理床舖",
                    "提購物袋或公事包",
                    "提重物（超過 4.5 公斤）",
                    "更換頭部上方的燈泡",
                    "洗頭或吹乾頭髮",
                    "洗身體背部",
                    "穿套頭上衣",
                    "用刀子切食物",
                    "從事輕鬆的休閒活動",
                    "從事上肢需費力或會受到衝擊的休閒活動",
                    "從事手臂自由擺動的休閒活動",
                    "利用交通工具從一地到另一地",
                    "性生活",
                ]}
                options={[
                    "沒有困難",
                    "有點困難",
                    "中度困難",
                    "非常困難",
                    "無法做到",
                ]}
                handleChange={handleQRadioGroupChange}
                valueGetter={valueGetter}
            />
            <QuestionRadio
                question="22.過去一星期，您手臂、肩膀、或手部的問題，對您與家人、朋友、鄰居、或團體等平常的社交活動，影響到什麼程度？"
                colName="q22"
                options={["完全沒有", "有一點", "中等程度", "非常", "極度"]}
                defaultValue={String(responseData["q22"])}
                handleChange={handleQRadioChange}
                questionWidth="full"
            />
            <QuestionRadio
                question="23.過去一星期，是否由於手臂、肩膀、或手部的問題，而在工作或其他日常活動受限？"
                colName="q23"
                options={[
                    "完全沒有限制",
                    "有一點限制",
                    "中度限制",
                    "非常限制",
                    "無法做到",
                ]}
                defaultValue={String(responseData["q23"])}
                handleChange={handleQRadioChange}
                questionWidth="full"
            />
            <div className="mb-2 mt-8 text-lg sm:text-2xl">上肢症狀</div>
            <div className="mb-2 text-gray-500">
                請評估您過去一星期手臂、肩膀、或手部出現下列症狀的嚴重程度
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
                startingQNum={24}
                questions={[
                    "感覺疼痛",
                    "做特定動作時感覺疼痛",
                    "感覺刺痛",
                    "感覺無力",
                    "感覺僵硬",
                ]}
                options={[
                    "完全沒有",
                    "有一點",
                    "中度困難",
                    "中等程度",
                    "非常",
                    "極度",
                ]}
                handleChange={handleQRadioGroupChange}
                valueGetter={valueGetter}
            />
            <QuestionRadio
                question="29. 過去一星期，由於手臂、肩膀、或手部的疼痛，您有多難入睡?"
                colName="q29"
                options={[
                    "毫無困難",
                    "有點困難",
                    "中度困難",
                    "非常困難",
                    "無法入睡",
                ]}
                defaultValue={String(responseData["q29"])}
                handleChange={handleQRadioChange}
                questionWidth="full"
            />
            <QuestionRadio
                question="30. 由於手臂、肩膀、或手部的問題，使我感到自己較無能、較沒自信、或較沒用"
                colName="q30"
                options={[
                    "完全不同意",
                    "不同意",
                    "沒有意見",
                    "同意",
                    "完全同意",
                ]}
                defaultValue={String(responseData["q30"])}
                handleChange={handleQRadioChange}
                questionWidth="full"
            />
            <div className="mb-2 mt-8 text-lg sm:text-2xl">工作單元</div>
            <div className="mb-2 text-gray-500">
                接下來的問題問到您手臂、肩膀、或手部的問題對您工作能力的影響
                （如果您是全職家管，家管亦可以算是一種工作）
            </div>
            <QuestionRadio
                colName="hasJob"
                question="您的工作是..."
                options={["已經退休", "受傷後沒有工作", "其他:"]}
                defaultValue={String(responseData.hasJob)}
                handleChange={handleQRadioChange}
                questionWidth="full"
                optionLayout="col"
            />
            {responseData.hasJob === 3 ? (
                <>
                    <input
                        type="text"
                        className="input"
                        defaultValue={responseData.job ?? ""}
                        onChange={async (e) => {
                            await saveResponse
                                .mutateAsync({
                                    colName: "job",
                                    value: e.target.value,
                                    patientId,
                                    questionnaire: "DASH",
                                    date: new Date(),
                                })
                                .catch((e) => {
                                    console.log(e)
                                })
                        }}
                        required
                        placeholder="請輸入您的工作"
                    />
                    <div className="my-2 mt-6 text-gray-500">
                        您在工作中是否遭遇任何困難?(包含家務)
                    </div>
                    <QuestionRadioGroup
                        startingQNum={31}
                        questions={[
                            "使用您慣用的技巧工作",
                            "忍受疼痛,繼續往常的工作",
                            "把工作做得如你所要的一樣好",
                            "在工作上花費跟往常一樣的時間",
                        ]}
                        options={[
                            "毫無困難",
                            "有點困難",
                            "中度困難",
                            "非常困難",
                            "無法做到",
                        ]}
                        handleChange={handleQRadioGroupChange}
                        valueGetter={valueGetter}
                    />
                </>
            ) : null}
            <div className="mb-2 mt-8 text-lg sm:text-2xl">
                高度技巧的運動/樂器演奏單元
            </div>
            <div className="mb-2 text-gray-500">
                接下來的問題是關於手臂、肩膀、或手部問題對您從事樂器演奏或運動所造成的影響。如果您從事不只一項運動或樂器演奏（或兩者皆有），請就對您最重要的一項活動來回答問題
            </div>
            <QuestionRadio
                colName="hasSportOrInstrument"
                question="您從事的運動或樂器是..."
                options={["我不運動或玩樂器", "其他:"]}
                defaultValue={String(responseData.hasSportOrInstrument)}
                handleChange={handleQRadioChange}
                questionWidth="full"
                optionLayout="col"
            />
            {responseData.hasSportOrInstrument === 2 ? (
                <>
                    <input
                        type="text"
                        className="input"
                        defaultValue={responseData.sportOrInstrument ?? ""}
                        onChange={async (e) => {
                            await saveResponse
                                .mutateAsync({
                                    colName: "sportOrInstrument",
                                    value: e.target.value,
                                    patientId,
                                    questionnaire: "DASH",
                                    date: new Date(),
                                })
                                .catch((e) => {
                                    console.log(e)
                                })
                        }}
                        required
                        placeholder="請輸入您的運動或樂器"
                    />
                    <div className="mb-2 mt-6 text-gray-500">
                        您在運動或樂器演奏是否遭遇任何困難?
                    </div>
                    <QuestionRadioGroup
                        startingQNum={35}
                        questions={[
                            "使用您慣用的技巧使演奏樂器或從事運動",
                            "忍受疼痛,從事運動或樂器演奏",
                            "從事運動或樂器演奏達到理想的水準",
                            "在演奏樂器或從事運動上花費跟往常一樣的時間",
                        ]}
                        options={[
                            "毫無困難",
                            "有點困難",
                            "中度困難",
                            "非常困難",
                            "無法做到",
                        ]}
                        handleChange={handleQRadioGroupChange}
                        valueGetter={valueGetter}
                    />
                </>
            ) : null}
        </div>
    )
}
