import { useEffect } from "react"
import { trpc } from "../../components/trpc"

type MHOPropType = {
    patientId: number
}
export const MHO = ({ patientId }: MHOPropType) => {
    const MHOResponse = trpc.questionnaire.responseTodayByPatient.useQuery({
        patientId,
        questionnaire: "MHO",
    })

    const valueGetter: QuestionGroupValueGetter = (qNum) =>
        //@ts-ignore
        MHOResponse.data ? String(MHOResponse.data[`q${qNum}`]) ?? "" : ""

    const addMHOResponse = trpc.questionnaire.addResponse.useMutation()
    const saveMHOResponse = trpc.questionnaire.saveResponse.useMutation()
    const handleChange: HandleRadioGroupChange = async (e, qNum) => {
        await saveMHOResponse
            .mutateAsync({
                qNum: `q${qNum}`,
                value: Number(e.target.value),
                patientId,
                questionnaire: "MHO",
                date: new Date(),
            })
            .catch((e) => {
                console.log(e)
            })
        await MHOResponse.refetch()
    }
    const handleQRadioChange: HandleRadioGroupChange = async (e, colName) => {
        await saveMHOResponse
            .mutateAsync({
                qNum: colName,
                value: Number(e.target.value),
                patientId,
                questionnaire: "MHO",
                date: new Date(),
            })
            .catch((e) => {
                console.log(e)
            })
        await MHOResponse.refetch()
    }

    useEffect(() => {
        // Create response if no saved result
        if (
            MHOResponse.isFetched &&
            !MHOResponse.isError &&
            !MHOResponse.data
        ) {
            addMHOResponse
                .mutateAsync({
                    date: new Date(),
                    patientId,
                    questionnaire: "MHO",
                })
                .then((r) => {
                    MHOResponse.refetch()
                })
                .catch((e) => {
                    console.log(e)
                })
        }
        return () => {}
    }, [MHOResponse.data])

    if (!MHOResponse.data) {
        return <>載入資料中，請稍後...</>
    }

    return (
        <div className=" mb-40">
            <div className="mb-2 text-gray-500">
                請以一週內的狀況/感受為基準回答
            </div>
            <div className="text-lg sm:text-2xl">整體手部功能</div>
            <div className="ml-80 hidden items-center justify-around text-gray-500 sm:flex">
                好
                <svg
                    className="h-4 w-4 scale-x-[2] fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                >
                    <path d="m18 6-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z" />
                </svg>
                差
            </div>
            <div className="text-gray-500">右手</div>
            <QuestionGroup
                questions={[
                    "總體來說，您的右手狀況如何?",
                    "您的右手手指活動如何?",
                    "您的右手腕關節活動如何?",
                    "您右手的力量如何?",
                    "您右手的感覺(靈敏性)如何?",
                ]}
                options={["優", "良", "可", "差", "很差"]}
                startingQNum={1}
                handleChange={handleChange}
                valueGetter={valueGetter}
            />
            <div className="mt-8 text-gray-500">左手</div>
            <QuestionGroup
                questions={[
                    "總體來說，您的左手狀況如何?",
                    "您的左手手指活動如何?",
                    "您的左手腕關節活動如何?",
                    "您左手的力量如何?",
                    "您左手的感覺(靈敏性)如何?",
                ]}
                options={["優", "良", "可", "差", "很差"]}
                startingQNum={6}
                handleChange={handleChange}
                valueGetter={valueGetter}
            />
            <div className="mt-20 text-lg sm:text-2xl">日常生活活動</div>
            <div className="ml-80 hidden items-center justify-around text-gray-500 sm:flex">
                簡單
                <svg
                    className="h-4 w-4 scale-x-[2] fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                >
                    <path d="m18 6-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z" />
                </svg>
                困難
            </div>
            <div className="text-gray-500">右手</div>
            <QuestionGroup
                questions={[
                    "使用右手單手擰門把手",
                    "使用右手手指撿硬幣",
                    "使用右手拿水杯(抓握)",
                    "使用右手用鑰匙開鎖",
                    "使用右手端平底煎鍋",
                ]}
                options={[
                    "不困難",
                    "有點難",
                    "有些困難",
                    "中等困難(需要很用力)",
                    "很困難(辦不到)",
                ]}
                startingQNum={11}
                handleChange={handleChange}
                valueGetter={valueGetter}
            />
            <div className="mt-8 text-gray-500">左手</div>
            <QuestionGroup
                questions={[
                    "使用左手單手擰門把手",
                    "使用左手手指撿硬幣",
                    "使用左手拿水杯(抓握)",
                    "使用左手用鑰匙開鎖",
                    "使用左手端平底煎鍋",
                ]}
                options={[
                    "不困難",
                    "有點難",
                    "有些困難",
                    "中等困難(需要很用力)",
                    "很困難(辦不到)",
                ]}
                startingQNum={16}
                handleChange={handleChange}
                valueGetter={valueGetter}
            />
            <div className="mt-8 text-gray-500">雙手</div>
            <QuestionGroup
                questions={[
                    "用雙手開較大的廣口瓶",
                    "用雙手扣上鈕扣",
                    "使用刀叉吃飯",
                    "拿大型需雙手環抱的購物袋",
                    "洗盤子",
                    "洗頭",
                    "系鞋帶",
                ]}
                options={[
                    "不困難",
                    "有點難",
                    "有些困難",
                    "中等困難(需要很用力)",
                    "很困難(辦不到)",
                ]}
                startingQNum={21}
                handleChange={handleChange}
                valueGetter={valueGetter}
            />
            <div className="mt-20 text-lg sm:text-2xl">工作</div>
            <div className="ml-80 hidden items-center justify-around text-gray-500 sm:flex">
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
            <QuestionGroup
                questions={[
                    "因為手或手腕關節的問題不能工作",
                    "因為手或手腕關節的問題縮短工時",
                    "因為手或手腕關節的問題必須改做輕量工作",
                    "因為手或手腕關節的問題減少工作量",
                    "因為手或手腕關節的問題延長工時",
                ]}
                options={["總是", "經常", "有時", "很少", "從未"]}
                startingQNum={28}
                handleChange={handleChange}
                valueGetter={valueGetter}
            />
            <div className="mt-20 text-lg sm:text-2xl">疼痛</div>
            <div className="ml-80 hidden items-center justify-around text-gray-500 sm:flex">
                痛
                <svg
                    className="h-4 w-4 scale-x-[2] fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                >
                    <path d="m18 6-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z" />
                </svg>
                不痛
            </div>
            <div className=" ml-80 hidden justify-around text-gray-500 sm:flex">
                {["很嚴重", "嚴重", "中度", "輕度", "不會痛"].map((option) => {
                    return (
                        <div className="text-base vertical-writing-rl">
                            {option}
                        </div>
                    )
                })}
            </div>
            <div className="mb-2 sm:flex">
                <div className="sm:w-80">33. 您手或手腕關節疼痛出現的頻率?</div>
                <RadioGroup
                    options={["很嚴重", "嚴重", "中度", "輕度", "不會痛"]}
                    name="33"
                    handleChange={handleChange}
                    defaultValue={
                        MHOResponse.data //@ts-ignore
                            ? String(MHOResponse.data["q33"]) ?? ""
                            : ""
                    }
                />
            </div>
            {
                //@ts-ignore
                (MHOResponse.data["q33"] == 1) | //@ts-ignore
                (MHOResponse.data["q33"] == 2) | //@ts-ignore
                (MHOResponse.data["q33"] == 3) | //@ts-ignore
                (MHOResponse.data["q33"] == 4) ? (
                    <>
                        <div className="mb-2 sm:flex">
                            <div className="sm:w-80">
                                34. 請描述您慣用手或慣用手腕關節的疼痛情況
                            </div>
                            <RadioGroup
                                options={[
                                    "不會痛",
                                    "輕度",
                                    "中度",
                                    "嚴重",
                                    "很嚴重",
                                ]}
                                name="34"
                                handleChange={handleChange}
                                defaultValue={
                                    MHOResponse.data //@ts-ignore
                                        ? String(MHOResponse.data["q34"]) ?? ""
                                        : ""
                                }
                            />
                        </div>
                        <QuestionGroup
                            questions={[
                                "手或手腕關節的疼痛對您睡眠的影響有多大?",
                                "手或手腕關節疼痛對您日常活動(包括吃飯及洗澡)的影響?",
                                "手或手腕關節疼痛是否讓您感覺不舒服?",
                            ]}
                            options={["總是", "經常", "有時", "很少", "從未"]}
                            startingQNum={35}
                            handleChange={handleChange}
                            valueGetter={valueGetter}
                        />
                    </>
                ) : null
            }
            <div className="mt-20 text-lg sm:text-2xl">外觀</div>
            <div className="ml-80 hidden items-center justify-around text-gray-500 sm:flex">
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
            <div className="text-gray-500">右手</div>
            <QuestionGroup
                questions={[
                    "我對我右手的外觀覺得不滿意",
                    "右手的外型有時讓我在大庭廣眾之下感到尷尬",
                    "右手的外型讓我覺得壓抑",
                    "右手外型影響我的社交活動",
                ]}
                options={["非常同意", "同意", "不確定", "不同意", "非常不同意"]}
                startingQNum={38}
                handleChange={handleChange}
                valueGetter={valueGetter}
            />
            <div className="mt-8 text-gray-500">左手</div>
            <QuestionGroup
                questions={[
                    "我對我左手的外觀覺得不滿意",
                    "左手的外型有時讓我在大庭廣眾之下感到尷尬",
                    "左手的外型讓我覺得壓抑",
                    "左手外型影響我的社交活動",
                ]}
                options={["非常同意", "同意", "不確定", "不同意", "非常不同意"]}
                startingQNum={42}
                handleChange={handleChange}
                valueGetter={valueGetter}
            />
            <div className="mt-20 text-lg sm:text-2xl">滿意度</div>
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
            <div className="text-gray-500">右手</div>
            <QuestionGroup
                questions={[
                    "右手的整體功能",
                    "右手指的運動功能",
                    "右手腕的運動功能",
                    "右手的力量",
                    "右手的疼痛情況",
                    "右手的感覺",
                ]}
                options={["非常滿意", "滿意", "不確定", "不滿意", "非常不滿意"]}
                startingQNum={46}
                handleChange={handleChange}
                valueGetter={valueGetter}
            />
            <div className="mt-8 text-gray-500">左手</div>
            <QuestionGroup
                questions={[
                    "左手的整體功能",
                    "左手指的運動功能",
                    "左手腕的運動功能",
                    "左手的力量",
                    "左手的疼痛情況",
                    "左手的感覺",
                ]}
                options={["非常滿意", "滿意", "不確定", "不滿意", "非常不滿意"]}
                startingQNum={52}
                handleChange={handleChange}
                valueGetter={valueGetter}
            />
            <div className="mt-20 text-lg sm:text-2xl">其他</div>
            <QuestionRadio
                colName="handedness"
                question="慣用手:"
                options={["右手", "左手", "兩手皆是"]}
                defaultValue={String(MHOResponse.data.handedness)}
                handleChange={handleQRadioChange}
            />
            <QuestionRadio
                colName="affectedSide"
                question="哪隻手問題較大?"
                options={["右手", "左手", "兩手都很嚴重"]}
                defaultValue={String(MHOResponse.data.affectedSide)}
                handleChange={handleQRadioChange}
            />
            <QuestionRadio
                colName="changedJob"
                question="自從您的手發現問題，是否因此改變了職業？"
                options={["是", "否"]}
                defaultValue={String(MHOResponse.data.changedJob)}
                handleChange={handleQRadioChange}
            />
            {MHOResponse.data.changedJob === 1 ? (
                <div className="flex justify-between">
                    <label className="text-gray-600">
                        舊工作:
                        <input
                            type="text"
                            className="input ml-4"
                            defaultValue={MHOResponse.data.previousJob ?? ""}
                            onChange={async (e) => {
                                await saveMHOResponse
                                    .mutateAsync({
                                        qNum: "previousJob",
                                        value: e.target.value,
                                        patientId,
                                        questionnaire: "MHO",
                                        date: new Date(),
                                    })
                                    .catch((e) => {
                                        console.log(e)
                                    })
                            }}
                        />
                    </label>
                    <label className="text-gray-600">
                        新工作:
                        <input
                            type="text"
                            className="input ml-4"
                            defaultValue={MHOResponse.data.currentJob ?? ""}
                            onChange={async (e) => {
                                await saveMHOResponse
                                    .mutateAsync({
                                        qNum: "currentJob",
                                        value: e.target.value,
                                        patientId,
                                        questionnaire: "MHO",
                                        date: new Date(),
                                    })
                                    .catch((e) => {
                                        console.log(e)
                                    })
                            }}
                        />
                    </label>
                </div>
            ) : null}
        </div>
    )
}

type HandleRadioGroupChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    colName: string,
) => void
type RadioGroupPropType = {
    options: Array<string>
    name: string
    handleChange: HandleRadioGroupChange
    defaultValue?: string
}
const RadioGroup = ({
    options,
    name,
    handleChange,
    defaultValue,
}: RadioGroupPropType) => {
    return (
        <div className="flex flex-grow justify-around">
            {options.map((option, index) => {
                return (
                    <label className="flex items-center" key={index}>
                        <input
                            type="radio"
                            name={name}
                            value={index + 1}
                            onChange={(e) => {
                                handleChange(e, name)
                            }}
                            checked={
                                defaultValue === String(index + 1)
                                    ? true
                                    : false
                            }
                        />
                        <div className="ml-1 mr-2 sm:hidden">{option}</div>
                    </label>
                )
            })}
        </div>
    )
}

type QuestionGroupValueGetter = (qNum: number) => string
type QuestionGroupPropType = {
    startingQNum: number
    questions: Array<string>
    options: Array<string>
    handleChange: HandleRadioGroupChange
    valueGetter: QuestionGroupValueGetter
}
const QuestionGroup = ({
    startingQNum,
    questions,
    options,
    handleChange,
    valueGetter,
}: QuestionGroupPropType) => {
    return (
        <>
            <div className=" ml-80 hidden justify-around text-gray-500 sm:flex">
                {options.map((option) => {
                    return (
                        <div className="text-base vertical-writing-rl">
                            {option}
                        </div>
                    )
                })}
            </div>
            {questions.map((question, index) => {
                const qNum = startingQNum + index

                return (
                    <div className="mb-2 sm:flex" key={qNum}>
                        <div className="sm:w-80">
                            {qNum}. {question}
                        </div>
                        <RadioGroup
                            options={options}
                            name={String(qNum)}
                            handleChange={handleChange}
                            defaultValue={valueGetter(qNum)}
                        />
                    </div>
                )
            })}
        </>
    )
}

type QuestionRadioPropType<T> = {
    question: string
    options: Array<string>
    colName: string
    handleChange: HandleRadioGroupChange
    defaultValue: T
}
const QuestionRadio = <T,>({
    question,
    options,
    handleChange,
    defaultValue,
    colName,
}: QuestionRadioPropType<T>) => {
    return (
        <div className="mb-2 sm:flex">
            <div className="sm:w-7/12">{question}</div>
            <div className="flex flex-grow justify-between ">
                {options.map((option, index) => {
                    return (
                        <label className="flex items-center" key={index}>
                            <input
                                type="radio"
                                name={colName}
                                value={index + 1}
                                onChange={(e) => {
                                    handleChange(e, colName)
                                }}
                                checked={
                                    defaultValue === String(index + 1)
                                        ? true
                                        : false
                                }
                            />
                            <div className="ml-1 mr-2">{option}</div>
                        </label>
                    )
                })}
            </div>
        </div>
    )
}
