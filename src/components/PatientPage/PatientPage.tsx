import { useStore } from "@nanostores/react"
import { $currentPatientID } from "./store"
import { useState } from "react"
import { Popover } from "@headlessui/react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"

export const PatientPage = () => {
    const currentPatientID = useStore($currentPatientID)
    const [basicInfoFormDisabled, setBasicInfoFormDisabled] = useState(true)
    return (
        <>
            <div className="mx-auto my-4 max-w-xs">
                <SearchBar />
            </div>
            <div className="container mx-auto flex">
                <div className="w-1/3">
                    <div className="flex">
                        <h6>基本資料</h6>
                        <svg
                            onClick={() => {
                                setBasicInfoFormDisabled(!basicInfoFormDisabled)
                            }}
                            className={`${
                                basicInfoFormDisabled ? "" : "text-gray-800"
                            } ml-2 mt-1 h-5 w-5 cursor-pointer fill-current text-gray-300 hover:text-gray-800`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                        >
                            <path d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10 3.6 3.6-10 10H6z" />
                        </svg>
                    </div>
                    <div className="mt-2">
                        <BasicInfoForm disabled={basicInfoFormDisabled} />
                    </div>
                    <div className="mt-6 flex">
                        <h6>其他資料</h6>
                        <svg
                            className="ml-2 mt-1 h-5 w-5 cursor-pointer fill-current text-gray-300 hover:text-gray-800"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                        >
                            <path d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10 3.6 3.6-10 10H6z" />
                        </svg>
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="relative flex">
                        <h6>照片</h6>
                        <UploadPicPopover />
                    </div>

                    <div className="mb-2 text-gray-600">2023.09.14</div>
                    <div className="flex">
                        <img
                            className="h-20 w-20"
                            src="https://prod-images-static.radiopaedia.org/images/8011971/de0f7a7fa8561dc31e023e21a554a3_gallery.jpg"
                        />
                        <img
                            className="h-20 w-20"
                            src="https://prod-images-static.radiopaedia.org/images/54243726/Normal_R_Hand_big_gallery.jpeg"
                        />
                        <img
                            className="h-20 w-20"
                            src="https://www.johnericksonmd.com/cms/wp-content/uploads/2015/07/hand-OA.jpg"
                        />
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="flex">
                        <h6 className="flex-grow">問卷資料</h6>
                        <QuestionnaireSettingPopover />
                    </div>
                    <div>
                        <div className="mb-2 mt-1 text-gray-600">
                            Michigan Hand Outcome
                        </div>

                        <QuestionnaireScoreAccordion
                            title={
                                <>
                                    <div className="ml-1 mr-2 text-sm">
                                        術後六個月
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        108.10.14
                                    </div>
                                </>
                            }
                            totalScore="80"
                        >
                            <>
                                <div className="flex">
                                    <div className="flex-grow">
                                        Overall Hand Function
                                    </div>
                                    <div className=" flex-grow-0">75</div>
                                </div>
                                <div className="flex">
                                    <div className="flex-grow">
                                        Activities of daily living
                                    </div>
                                    <div className=" flex-grow-0">75</div>
                                </div>
                                <div className="flex">
                                    <div className="flex-grow">Work</div>
                                    <div className=" flex-grow-0">85</div>
                                </div>
                                <div className="flex">
                                    <div className="flex-grow">Pain</div>
                                    <div className=" flex-grow-0">60</div>
                                </div>
                                <div className="flex">
                                    <div className="flex-grow">Aesthetics</div>
                                    <div className=" flex-grow-0">75</div>
                                </div>
                                <div className="flex">
                                    <div className="flex-grow">
                                        Satisfaction
                                    </div>
                                    <div className=" flex-grow-0">85</div>
                                </div>
                            </>
                        </QuestionnaireScoreAccordion>
                    </div>
                </div>
            </div>
        </>
    )
}

const SearchBar = () => {
    return (
        <>
            <div className="relative">
                <input
                    type="text"
                    className="peer mb-2 mr-3 mt-2 w-full border-b border-gray-300 bg-transparent px-8 py-1 leading-tight text-gray-700 focus:border-gray-500 focus:outline-none"
                    placeholder="輸入病歷號"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-0 top-2 h-6 w-6 fill-current text-gray-300 peer-focus:text-gray-500"
                    viewBox="0 0 32 32"
                >
                    <path d="m29 27.586-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9 9.01 9.01 0 0 1-9-9Z" />
                </svg>
            </div>
        </>
    )
}

const QuestionnaireScoreAccordion = ({
    title = <></>,
    children = <></>,
    totalScore = "",
}) => {
    return (
        <details className="group" open>
            <summary className="flex cursor-pointer list-none items-center justify-between">
                <div className="flex items-center">
                    <span className="transition group-open:rotate-180">
                        <svg
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            shapeRendering="geometricPrecision"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </span>
                    {title}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="ml-2 h-5 w-5 fill-current text-gray-300 hover:text-gray-800"
                    >
                        <path d="M10 18h8v2h-8zM10 13h12v2H10zM10 23h5v2h-5z" />
                        <path d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z" />
                    </svg>
                </div>
                <div className="group-open:text-gray-600">{totalScore}</div>
            </summary>
            <p className="group-open:animate-fadeIn">{children}</p>
        </details>
    )
}

const UploadPicPopover = () => {
    return (
        <>
            <Popover className="relative">
                {({ open }) => {
                    return (
                        <>
                            <Popover.Button className="ml-2 mt-1 h-5 w-5 focus:outline-0">
                                <svg
                                    className={`${
                                        open ? "text-gray-800" : ""
                                    } fill-current text-gray-300 hover:text-gray-800`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                >
                                    <path d="m11 18 1.41 1.41L15 16.83V29h2V16.83l2.59 2.58L21 18l-5-5-5 5z" />
                                    <path d="M23.5 22H23v-2h.5a4.5 4.5 0 0 0 .36-9H23l-.1-.82a7 7 0 0 0-13.88 0L9 11h-.86a4.5 4.5 0 0 0 .36 9H9v2h-.5A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22Z" />
                                </svg>
                            </Popover.Button>
                            <Popover.Panel className="absolute bg-gray-100">
                                <form>
                                    <input type="file" />

                                    <label>
                                        <span className=" mr-1 mt-2 inline-block">
                                            日期:
                                        </span>
                                        <input
                                            type="date"
                                            defaultValue={new Date()
                                                .toISOString()
                                                .substring(0, 10)}
                                        />
                                    </label>
                                    <div className="mt-4 flex justify-end">
                                        <button className="btn" type="submit">
                                            上傳照片
                                        </button>
                                    </div>
                                </form>
                            </Popover.Panel>
                        </>
                    )
                }}
            </Popover>
        </>
    )
}

type BasicInfoInputs = {
    gender: "male" | "female"
    name: string
    id: number
    mainDiagnosis: string
}

const BasicInfoForm = ({ disabled = true }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<BasicInfoInputs>({
        defaultValues: {
            gender: "male",
            name: "郭克嚴",
            id: 10836635,
            mainDiagnosis: "Raynaud's Phenomenon",
        },
    })

    return (
        <>
            <form>
                <fieldset disabled={disabled}>
                    <div className="flex">
                        性別:
                        <label className="ml-6">
                            <input
                                {...register("gender")}
                                className="peer hidden"
                                type="radio"
                                value="male"
                            />
                            <svg
                                className="mt-[1.5px] h-5 w-5 fill-current text-gray-300 peer-checked:text-gray-800"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                            >
                                <path d="M18 4v2h6.586l-7.688 7.689a8.028 8.028 0 1 0 1.414 1.414L26 7.414V14h2V4Zm-6 22a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6Z" />
                            </svg>
                        </label>
                        <div className="text-gray-300">/</div>
                        <label>
                            <input
                                {...register("gender")}
                                className="peer hidden"
                                type="radio"
                                value="female"
                            />
                            <svg
                                className="mt-0.5 h-5 w-5 fill-current text-gray-300 peer-checked:text-gray-800"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                            >
                                <path d="M17 19.93a8 8 0 1 0-2 0V22h-5v2h5v4h2v-4h5v-2h-5ZM10 12a6 6 0 1 1 6 6 6.007 6.007 0 0 1-6-6Z" />
                            </svg>
                        </label>
                    </div>
                    <label className="block">
                        姓名:
                        <input {...register("name")} className="input ml-6" />
                    </label>
                    <label className="block">
                        病歷號:
                        <input {...register("id")} className="input ml-2" />
                    </label>
                    <label className="block">
                        主診斷:
                        <input
                            {...register("mainDiagnosis")}
                            className="input ml-2"
                            list="diagnoses"
                        />
                        <datalist id="diagnoses">
                            <option value="Raynaud's Phenomenon" />
                            <option value="AIN Compression" />
                        </datalist>
                    </label>
                </fieldset>
            </form>
        </>
    )
}

type QuestionnaireSettingInputs = {
    trackingQuestionnaires: string[]
}

const QuestionnaireSettingPopover = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<QuestionnaireSettingInputs>({
        defaultValues: { trackingQuestionnaires: ["MHOQ"] },
    })

    return (
        <>
            <Popover className="relative">
                {({ open }) => {
                    return (
                        <>
                            <Popover.Button className="ml-2 mt-1 h-5 w-5 focus:outline-0">
                                <svg
                                    className={`${
                                        open ? "text-gray-800" : ""
                                    } fill-current text-gray-300 hover:text-gray-800`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                >
                                    <path d="m31.707 19.293-3-3a1 1 0 0 0-1.414 0L18 25.586V30h4.414l9.293-9.293a1 1 0 0 0 0-1.414ZM21.586 28H20v-1.586l5-5L26.586 23l-5 5ZM28 21.586 26.414 20 28 18.414 29.586 20 28 21.586ZM16 22c-3.364 0-6-2.636-6-6s2.636-6 6-6 6 2.636 6 6-2.636 6-6 6Zm0-10c-2.28 0-4 1.72-4 4s1.72 4 4 4 4-1.72 4-4-1.72-4-4-4Z" />
                                    <path d="m27.547 12 1.733-1-2.336-4.044a2 2 0 0 0-2.373-.894l-2.434.823a11.056 11.056 0 0 0-1.312-.758l-.503-2.52A2 2 0 0 0 18.36 2h-4.72a2 2 0 0 0-1.962 1.608l-.503 2.518c-.46.225-.906.47-1.327.754l-2.42-.818a2 2 0 0 0-2.373.894l-2.36 4.088a2 2 0 0 0 .412 2.502l1.931 1.697C5.021 15.495 5 15.745 5 16c0 .258.01.513.028.766l-1.92 1.688a2 2 0 0 0-.413 2.502l2.36 4.088a2 2 0 0 0 2.374.894l2.434-.823c.418.282.856.535 1.312.758l.503 2.519A2 2 0 0 0 13.64 30H16v-2h-2.36l-.71-3.55a9.096 9.096 0 0 1-2.695-1.572l-3.447 1.166-2.36-4.088 2.725-2.395a8.929 8.929 0 0 1-.007-3.128l-2.719-2.39 2.361-4.087 3.427 1.16A9.027 9.027 0 0 1 12.93 7.55L13.64 4h4.721l.71 3.55a9.1 9.1 0 0 1 2.695 1.572l3.447-1.166L27.547 12Z" />
                                </svg>
                            </Popover.Button>
                            <Popover.Panel className="absolute right-0 w-40 bg-gray-100">
                                <form>
                                    <label className="block">
                                        <input
                                            {...register(
                                                "trackingQuestionnaires",
                                            )}
                                            type="checkbox"
                                            value="MHOQ"
                                        />
                                        MHOQ
                                    </label>
                                    <label className="block">
                                        <input
                                            {...register(
                                                "trackingQuestionnaires",
                                            )}
                                            type="checkbox"
                                            value="SF-36"
                                        />
                                        SF-36
                                    </label>
                                    <label className="block">
                                        <input
                                            {...register(
                                                "trackingQuestionnaires",
                                            )}
                                            type="checkbox"
                                            value="SF-12"
                                        />
                                        SF-12
                                    </label>
                                    <label className="block">
                                        <input
                                            {...register(
                                                "trackingQuestionnaires",
                                            )}
                                            type="checkbox"
                                            value="WHOQOL-BREF"
                                        />
                                        WHOQOL-BREF
                                    </label>
                                    <label className="block">
                                        <input
                                            {...register(
                                                "trackingQuestionnaires",
                                            )}
                                            type="checkbox"
                                            value="BSRS"
                                        />
                                        BSRS
                                    </label>
                                    <label className="block">
                                        <input
                                            {...register(
                                                "trackingQuestionnaires",
                                            )}
                                            type="checkbox"
                                            value="DASH"
                                        />
                                        DASH
                                    </label>
                                    <label className="block">
                                        <input
                                            {...register(
                                                "trackingQuestionnaires",
                                            )}
                                            type="checkbox"
                                            value="Quick-DASH"
                                        />
                                        Quick-DASH
                                    </label>
                                    <label className="block">
                                        <input
                                            {...register(
                                                "trackingQuestionnaires",
                                            )}
                                            type="checkbox"
                                            value="BCTQ"
                                        />
                                        BCTQ
                                    </label>
                                </form>
                            </Popover.Panel>
                        </>
                    )
                }}
            </Popover>
        </>
    )
}
