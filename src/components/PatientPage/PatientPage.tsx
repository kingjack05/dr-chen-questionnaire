import { useEffect, useState } from "react"
import { Combobox, Popover, Dialog } from "@headlessui/react"
import { useForm, type SubmitHandler } from "react-hook-form"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import toast, { Toaster } from "react-hot-toast"

import { PatientBasicInfoForm } from "../forms/PatientBasicInfoForm"
import { trpc } from "../trpc"
import { QueryContextProvider } from "../Providers/QueryContext"
import { AddPatientForm } from "../forms/AddPatientForm"
import { questionnaireEnum, type FileData } from "../../server/patients/schema"

const PatientPageWithoutProvider = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const patientLastEdited = trpc.patient.patientLastEdited.useQuery()
    const patientID =
        queryParameters.get("id") ?? patientLastEdited.data?.id
            ? String(patientLastEdited.data?.id)
            : "10836635"
    const patientData = trpc.patient.patientById.useQuery(
        Number(patientID),
    ).data
    const refetchPatientData = trpc.patient.patientById.useQuery(
        Number(patientID),
    ).refetch

    const patientFiles = patientData?.files
        ? (patientData.files as FileData[])
        : ([] as FileData[])
    type FilesDateMap = {
        [date: string]: Array<{ url: string; type: string; extension: string }>
    }
    // https://stackoverflow.com/questions/73253207/typeerror-products-groupby-is-not-a-function
    const patientFilesDateMap = patientFiles.reduce((acc, file) => {
        const { url, type, extension } = file
        ;(acc[file.date] = acc[file.date] || []).push({ url, type, extension })
        return acc
    }, {} as FilesDateMap)

    const editPatient = trpc.patient.editPatient.useMutation()

    const [basicInfoFormDisabled, setBasicInfoFormDisabled] = useState(true)

    if (!patientData) {
        return <>Loading...</>
    }
    return (
        <>
            <div className="mx-auto my-4 max-w-xs">
                <SearchBar />
            </div>
            <div className="container mx-auto flex flex-col sm:flex-row">
                <div className=" p-4 sm:w-1/3">
                    <div className="flex">
                        <div className="flex flex-grow">
                            <h6>基本資料</h6>
                            <svg
                                onClick={() => {
                                    setBasicInfoFormDisabled(
                                        !basicInfoFormDisabled,
                                    )
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
                        <AddPatientModal />
                    </div>
                    <div className="mt-2">
                        <PatientBasicInfoForm
                            disabled={basicInfoFormDisabled}
                            onSubmit={async (v) => {
                                await editPatient.mutate(v)
                                await refetchPatientData()
                            }}
                            defaultValues={{
                                ...patientData,
                                lastEdited: patientData.lastEdited
                                    ? new Date(patientData.lastEdited)
                                    : new Date(),
                                // @ts-ignore defaultValue only accepts strings
                                birthday: new Date(patientData.birthday)
                                    .toISOString()
                                    .substring(0, 10),
                            }}
                        />
                    </div>
                    <div className=" hidden sm:block">
                        <div className="mt-6 flex">
                            <h6 className="mb-2">其他資料</h6>
                            <svg
                                className="ml-2 mt-1 h-5 w-5 cursor-pointer fill-current text-gray-300 hover:text-gray-800"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                            >
                                <path d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10 3.6 3.6-10 10H6z" />
                            </svg>
                        </div>
                        {patientData.diagnoses &&
                            patientData.diagnoses.map((diagnosis) => {
                                return (
                                    <div>
                                        <a
                                            href={`/dataStudio?table=${diagnosis}&id=${patientID}`}
                                            className="btn"
                                            target="_blank"
                                        >
                                            前往{diagnosis}表格
                                        </a>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div className=" p-4 sm:w-1/3">
                    <div className="relative flex">
                        <h6>檔案</h6>
                        <UploadPopover id={patientID} />
                    </div>
                    {Object.entries(patientFilesDateMap).map((obj) => (
                        <div key={obj[0]}>
                            <div className="mb-2 text-gray-600">{obj[0]}</div>
                            {obj[1].map(({ url, type }) => (
                                <div key={url}>
                                    {type === "image" && (
                                        <img src={url} className="w-18 h-24" />
                                    )}
                                    {type === "video" && (
                                        <video
                                            src={url}
                                            className="w-18 h-24"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className=" p-4 sm:w-1/3">
                    <div className="flex">
                        <h6 className="flex-grow">問卷資料</h6>
                        <QuestionnaireSettingPopover
                            defaultValues={{
                                followingQuestionnaires:
                                    patientData.followingQuestionnaires ?? [],
                            }}
                            onSubmit={async (data) => {
                                await editPatient.mutateAsync({
                                    id: patientData.id,
                                    name: patientData.name,
                                    birthday: patientData.birthday,
                                    followingQuestionnaires:
                                        data.followingQuestionnaires,
                                })
                                await refetchPatientData()
                            }}
                        />
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
            <Toaster />
        </>
    )
}

export const PatientPage = () => {
    return (
        <QueryContextProvider>
            <PatientPageWithoutProvider />
        </QueryContextProvider>
    )
}

const SearchBar = () => {
    const patientIDAndNames =
        trpc.patient.getPatientsIdAndName.useQuery().data ?? []
    const [query, setQuery] = useState("")

    const filteredPateints = query
        ? patientIDAndNames.filter((patient) => {
              return (
                  String(patient.id).includes(query) ||
                  patient.name.includes(query)
              )
          })
        : []

    return (
        <>
            <div className="relative">
                <Combobox
                    onChange={(value) => {
                        window.open(`?id=${value}`)
                    }}
                >
                    <div className="relative">
                        <Combobox.Input
                            onChange={(e) => setQuery(e.target.value)}
                            className="peer mb-2 mr-3 mt-2 w-full border-b border-gray-300 bg-transparent px-8 py-1 leading-tight text-gray-700 focus:border-gray-500 focus:outline-none"
                            placeholder="輸入病歷號或姓名"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute left-0 top-2 h-6 w-6 fill-current text-gray-300 peer-focus:text-gray-500"
                            viewBox="0 0 32 32"
                        >
                            <path d="m29 27.586-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9 9.01 9.01 0 0 1-9-9Z" />
                        </svg>
                    </div>
                    <Combobox.Options className="absolute w-full bg-gray-100">
                        {filteredPateints.map((patient) => (
                            <Combobox.Option
                                key={patient.id}
                                value={patient.id}
                            >
                                {({ active }) => (
                                    <div
                                        className={`flex w-full p-1 ${
                                            active
                                                ? "bg-teal-600 text-white"
                                                : ""
                                        }`}
                                    >
                                        <div className="flex-1">
                                            {patient.id}
                                        </div>
                                        <div>{patient.name}</div>
                                    </div>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Combobox>
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

const UploadProgressIndicator = ({
    file,
    startUpload,
    date,
    id,
}: {
    file: File
    startUpload: boolean
    date: string
    id: number
}) => {
    const [uploadState, setUploadState] = useState("idle")
    const [uploadProgress, setUploadProgress] = useState(0)

    const refetchPatientData = trpc.patient.patientById.useQuery(id).refetch()
    const getUploadPresignedUrl =
        trpc.patient.getStandardUploadPresignedUrl.useMutation()
    const addPatientFileData = trpc.patient.addFileData.useMutation()

    useEffect(() => {
        if (startUpload === true && uploadState === "idle") {
            setUploadState("uploading")
            const upload = async () => {
                // https://nkrkn.me/writing/t3-s3
                try {
                    const key = uuidv4()
                    const uploadUrl = await getUploadPresignedUrl.mutateAsync({
                        key,
                    })
                    await axios
                        .put(uploadUrl, file.slice(), {
                            headers: { "Content-Type": file.type },
                            onUploadProgress(progressEvent) {
                                if (!progressEvent.total) {
                                    return
                                }
                                setUploadProgress(
                                    Math.round(
                                        (100 * progressEvent.loaded) /
                                            progressEvent.total,
                                    ),
                                )
                            },
                        })
                        .then((response) => {
                            setUploadState("done")
                        })
                    const type = file.type.split("/")[0]
                    const extension = file.type.split("/")[1]
                    console.log(type, extension)
                    await addPatientFileData.mutateAsync({
                        date,
                        id,
                        url: `https://reason.s3.us-west-004.backblazeb2.com/${key}`,
                        type,
                        extension,
                    })
                    await refetchPatientData
                } catch (error) {
                    console.log(error)
                    setUploadState("error")
                }
            }
            upload()
        }
    }, [startUpload])

    return (
        <div className="flex flex-col">
            <div>{uploadState}</div>
            <div>
                {file.type.split("/")[0] === "image" && (
                    <img
                        src={window.URL.createObjectURL(file)}
                        className="w-18 h-24"
                    />
                )}
                {file.type.split("/")[0] === "video" && (
                    <video
                        src={window.URL.createObjectURL(file)}
                        className="w-18 h-24"
                    />
                )}
            </div>
            <div>{uploadProgress}%</div>
        </div>
    )
}

const UploadPopover = ({ id }: { id: string }) => {
    const [startUpload, setStartUpload] = useState(false)
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10))
    const [filesToUpload, setFilesToUpload] = useState<Array<File>>([])

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
                            <Popover.Panel className="absolute z-10 bg-gray-100">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*, video/*"
                                    onChange={(e) => {
                                        if (!e.target.files) {
                                            return
                                        }
                                        let toAdd = Array.from(e.target.files)
                                        setFilesToUpload([
                                            ...filesToUpload,
                                            ...toAdd,
                                        ])
                                    }}
                                />
                                <label>
                                    <span className=" mr-1 mt-2 inline-block">
                                        日期:
                                    </span>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => {
                                            setDate(e.target.value)
                                        }}
                                    />
                                </label>
                                <div className="mt-4 flex">
                                    <div className="flex-grow">
                                        <button
                                            className="btn"
                                            onClick={() => {
                                                setStartUpload(true)
                                                setTimeout(() => {
                                                    setStartUpload(false)
                                                }, 500)
                                            }}
                                        >
                                            開始上傳
                                        </button>
                                    </div>
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            setFilesToUpload([])
                                        }}
                                    >
                                        清除
                                    </button>
                                </div>
                                <div className="flex flex-wrap">
                                    {filesToUpload.map((file) => (
                                        <UploadProgressIndicator
                                            file={file}
                                            startUpload={startUpload}
                                            date={date}
                                            id={Number(id)}
                                            key={file.name}
                                        />
                                    ))}
                                </div>
                            </Popover.Panel>
                        </>
                    )
                }}
            </Popover>
        </>
    )
}

type Questionnaires = (typeof questionnaireEnum)[number]
type QuestionnaireSettingInputs = {
    followingQuestionnaires: Questionnaires[]
}
const QuestionnaireSettingPopover = ({
    defaultValues,
    onSubmit,
}: {
    defaultValues: QuestionnaireSettingInputs
    onSubmit: SubmitHandler<QuestionnaireSettingInputs>
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<QuestionnaireSettingInputs>({
        defaultValues,
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
                                設定追蹤問卷
                                <form
                                    onSubmit={handleSubmit(
                                        (data) => {
                                            try {
                                                onSubmit(data)
                                                toast.success("儲存成功")
                                            } catch (error) {
                                                toast.error("儲存失敗")
                                            }
                                        },
                                        (e) => {
                                            console.log(e)
                                            toast.error("儲存失敗")
                                        },
                                    )}
                                >
                                    {questionnaireEnum.map((questionnaire) => {
                                        return (
                                            <label className="block">
                                                <input
                                                    {...register(
                                                        "followingQuestionnaires",
                                                    )}
                                                    type="checkbox"
                                                    value={questionnaire}
                                                />
                                                {questionnaire}
                                            </label>
                                        )
                                    })}
                                    <button type="submit" className="btn mt-2">
                                        儲存
                                    </button>
                                </form>
                            </Popover.Panel>
                        </>
                    )
                }}
            </Popover>
        </>
    )
}

const AddPatientModal = () => {
    let [isOpen, setIsOpen] = useState(false)
    const addPatient = trpc.patient.addPatient.useMutation()

    return (
        <>
            <button
                className="text-gray-300 hover:text-gray-800"
                onClick={() => {
                    setIsOpen(true)
                }}
            >
                + 新建檔案
            </button>
            <Dialog
                className=" relative"
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                {({ open }) => {
                    return (
                        <>
                            <div
                                className="fixed inset-0 bg-black/30"
                                aria-hidden="true"
                            />
                            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                                <Dialog.Panel className="mx-auto max-w-sm rounded bg-white py-4 pl-4 pr-8">
                                    <AddPatientForm
                                        onSubmit={(v) => {
                                            console.log(v)
                                            addPatient.mutate(v)
                                        }}
                                    />
                                </Dialog.Panel>
                            </div>
                        </>
                    )
                }}
            </Dialog>
        </>
    )
}
