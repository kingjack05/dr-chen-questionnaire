export type HandleRadioGroupChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    colName: string,
) => void
type RadioGroupPropType = {
    options: Array<string>
    colName: string
    handleChange: HandleRadioGroupChange
    defaultValue?: string
}
export const RadioGroup = ({
    options,
    colName,
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
                            required
                        />
                        <div className="ml-1 mr-2 sm:hidden">{option}</div>
                    </label>
                )
            })}
        </div>
    )
}

export type QuestionGroupValueGetter = (qNum: number) => string
type QuestionGroupPropType = {
    startingQNum: number
    questions: Array<string>
    options: Array<string>
    handleChange: HandleRadioGroupChange
    valueGetter: QuestionGroupValueGetter
    questionWidth?: "base" | "lg" | "xl"
}
export const QuestionRadioGroup = ({
    startingQNum,
    questions,
    options,
    handleChange,
    valueGetter,
    questionWidth = "base",
}: QuestionGroupPropType) => {
    const widthVariants: {
        [variant: string]: { width: string; margin: string }
    } = {
        base: { width: "sm:w-80", margin: "ml-80" },
        lg: { width: "sm:w-96", margin: "ml-96" },
        xl: { width: "sm:w-[580px]", margin: "ml-[580px]" },
    }

    return (
        <>
            <div
                className={
                    `${widthVariants[questionWidth].margin}` +
                    " hidden justify-around text-gray-500 sm:flex"
                }
                style={{ marginLeft: questionWidth }}
            >
                {options.map((option) => {
                    return (
                        <div className="text- text-base vertical-writing-rl">
                            {option}
                        </div>
                    )
                })}
            </div>
            {questions.map((question, index) => {
                const qNum = startingQNum + index

                return (
                    <div className="mb-2 sm:flex" key={qNum}>
                        <div
                            className={`${widthVariants[questionWidth].width}`}
                        >
                            {qNum}. {question}
                        </div>
                        <RadioGroup
                            options={options}
                            colName={String(qNum)}
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
    questionWidth?: "base" | "xl" | "full"
    optionLayout?: "row" | "col"
}
export const QuestionRadio = <T,>({
    question,
    options,
    handleChange,
    defaultValue,
    colName,
    questionWidth = "base",
    optionLayout = "row",
}: QuestionRadioPropType<T>) => {
    const widthVariants: {
        [variant: string]: string
    } = {
        base: "sm:w-7/12",
        xl: "sm:w-[580px]",
        full: "sm:w-full",
    }
    const flexVariant: {
        [variant: string]: string
    } = {
        row: "",
        col: "flex-col",
    }

    return (
        <div className="mb-2 flex-wrap sm:flex">
            <div className={`${widthVariants[questionWidth]}`}>{question}</div>
            <div
                className={
                    "flex flex-grow justify-between " +
                    `${flexVariant[optionLayout]}`
                }
            >
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
                                required
                            />
                            <div className="ml-1 mr-2 text-gray-700">
                                {option}
                            </div>
                        </label>
                    )
                })}
            </div>
        </div>
    )
}
