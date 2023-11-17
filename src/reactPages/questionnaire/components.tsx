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
        <div className="flex flex-grow flex-col justify-around gap-y-1 sm:flex-row sm:gap-0">
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
                            onFocus={(e) => {
                                const bounding =
                                    e.target.getBoundingClientRect()
                                const isInViewport =
                                    bounding.top >= 0 &&
                                    bounding.bottom <= window.innerHeight
                                if (!isInViewport) {
                                    e.target.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                    })
                                }
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
        base: { width: "sm:w-96", margin: "ml-96" },
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
                        <div
                            className=" text-base vertical-writing-rl"
                            key={option}
                        >
                            {option}
                        </div>
                    )
                })}
            </div>
            {questions.map((question, index) => {
                const qNum = startingQNum + index
                const hasValue =
                    valueGetter(qNum) && valueGetter(qNum) !== "null"

                return (
                    <div
                        className="my-8 focus-within:bg-gray-200 sm:flex"
                        key={qNum}
                    >
                        <div
                            className={`${widthVariants[questionWidth].width} ${
                                hasValue ? "text-gray-400" : ""
                            }`}
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

    const hasValue = defaultValue !== "null"

    return (
        <div className="mb-2 flex-wrap sm:flex">
            <div
                className={`${widthVariants[questionWidth]} ${
                    hasValue ? "text-gray-400" : ""
                }`}
            >
                {question}
            </div>
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
