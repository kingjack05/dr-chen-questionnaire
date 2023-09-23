import { useStore } from "@nanostores/react"
import { $currentPatientID } from "./store"
// import { Accordion } from "../design system/Accordion/Accordion"

export const PatientPage = () => {
    const currentPatientID = useStore($currentPatientID)
    return (
        <>
            <div className="mx-auto my-4 max-w-xs">
                <SearchBar />
            </div>
            <div className="container mx-auto flex">
                <div className="w-1/3">
                    <h6>基本資料</h6>
                </div>
                <div className="w-1/3">
                    <h6>照片</h6>
                </div>
                <div className="w-1/3">
                    <div className="flex">
                        <h6 className="flex-grow">問卷資料</h6>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="m-1 h-5 w-5"
                            viewBox="0 0 32 32"
                        >
                            <path d="m31.707 19.293-3-3a1 1 0 0 0-1.414 0L18 25.586V30h4.414l9.293-9.293a1 1 0 0 0 0-1.414ZM21.586 28H20v-1.586l5-5L26.586 23l-5 5ZM28 21.586 26.414 20 28 18.414 29.586 20 28 21.586ZM16 22c-3.364 0-6-2.636-6-6s2.636-6 6-6 6 2.636 6 6-2.636 6-6 6Zm0-10c-2.28 0-4 1.72-4 4s1.72 4 4 4 4-1.72 4-4-1.72-4-4-4Z" />
                            <path d="m27.547 12 1.733-1-2.336-4.044a2 2 0 0 0-2.373-.894l-2.434.823a11.056 11.056 0 0 0-1.312-.758l-.503-2.52A2 2 0 0 0 18.36 2h-4.72a2 2 0 0 0-1.962 1.608l-.503 2.518c-.46.225-.906.47-1.327.754l-2.42-.818a2 2 0 0 0-2.373.894l-2.36 4.088a2 2 0 0 0 .412 2.502l1.931 1.697C5.021 15.495 5 15.745 5 16c0 .258.01.513.028.766l-1.92 1.688a2 2 0 0 0-.413 2.502l2.36 4.088a2 2 0 0 0 2.374.894l2.434-.823c.418.282.856.535 1.312.758l.503 2.519A2 2 0 0 0 13.64 30H16v-2h-2.36l-.71-3.55a9.096 9.096 0 0 1-2.695-1.572l-3.447 1.166-2.36-4.088 2.725-2.395a8.929 8.929 0 0 1-.007-3.128l-2.719-2.39 2.361-4.087 3.427 1.16A9.027 9.027 0 0 1 12.93 7.55L13.64 4h4.721l.71 3.55a9.1 9.1 0 0 1 2.695 1.572l3.447-1.166L27.547 12Z" />
                        </svg>
                    </div>
                    <div>
                        <div className="mb-2 mt-4 text-gray-600">
                            Michigan Hand Outcome
                        </div>

                        <Accordion
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
                            Test
                        </Accordion>
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

const Accordion = ({ title, children, totalScore }) => {
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
                </div>
                <div>{totalScore}</div>
            </summary>
            <p className="group-open:animate-fadeIn">{children}</p>
        </details>
    )
}
