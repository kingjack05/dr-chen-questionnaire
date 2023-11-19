import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import toast, { Toaster } from "react-hot-toast"

import {
    diagnosisEnum,
    questionnaireEnum,
    insertPatientSchema,
} from "../../server/patients/schema"

type TForm = z.infer<typeof insertPatientSchema>

type PropTypes = {
    onSubmit: SubmitHandler<TForm>
}

export const AddPatientForm = ({ onSubmit }: PropTypes) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<TForm>({
        // zodResolver zod version issues: https://github.com/colinhacks/zod/issues/2663, https://github.com/orgs/react-hook-form/discussions/10861
        // @ts-ignore can't figure it out so just ignoring it for now https://github.com/react-hook-form/resolvers/issues/451
        resolver: zodResolver(insertPatientSchema),
        defaultValues: {
            diagnoses: [],
            followingQuestionnaires: [],
        },
    })

    return (
        <>
            <form
                onSubmit={handleSubmit(
                    (data) => {
                        try {
                            onSubmit(data)
                            toast.success("建檔成功")
                        } catch (error) {
                            toast.error("建檔失敗")
                        }
                    },
                    (error) => {
                        console.log(error)
                        toast.error("建檔失敗")
                    },
                )}
            >
                <fieldset>
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
                    <label className="my-4 flex">
                        姓名:
                        <input
                            {...register("name")}
                            className="input ml-8 block w-32 bg-transparent"
                        />
                    </label>
                    <label className="my-4 flex">
                        病歷號:
                        <input
                            type="number"
                            {...register("id", {
                                valueAsNumber: true,
                            })}
                            className="input ml-4 block w-32 bg-transparent"
                        />
                    </label>
                    <label className="my-4 flex">
                        生日:
                        <input
                            type="number"
                            {...register("birthday", {
                                setValueAs: (v) => {
                                    const l = v.length
                                    const year = v.substring(0, l - 4)
                                    const month = v.substring(l - 4, l - 2)
                                    const day = v.substring(l - 2)
                                    return new Date(
                                        `${String(
                                            Number(year) + 1911,
                                        )}-${month}-${day}T08:00:00.000+08:00`,
                                    )
                                },
                            })}
                            className="input ml-8 block w-32 bg-transparent"
                            placeholder="格式: 1121119"
                        />
                    </label>
                    <div>
                        主診斷:
                        {diagnosisEnum.map((diagnosis) => (
                            <label className="block" key={diagnosis}>
                                <input
                                    type="checkbox"
                                    value={diagnosis}
                                    {...register("diagnoses")}
                                    className=" mr-1"
                                    onClick={() => {
                                        if (diagnosis === "AIN Compression") {
                                            setValue(
                                                "followingQuestionnaires",
                                                ["BSRS", "SF36", "DASH"],
                                            )
                                        }
                                        if (
                                            diagnosis === "Raynaud" ||
                                            diagnosis === "RA"
                                        ) {
                                            setValue(
                                                "followingQuestionnaires",
                                                ["MHO", "SF36"],
                                            )
                                        }
                                    }}
                                />
                                {diagnosis}
                            </label>
                        ))}
                    </div>
                    <div>
                        追蹤問卷:
                        {questionnaireEnum.map((questionnaire) => (
                            <label className="block" key={questionnaire}>
                                <input
                                    type="checkbox"
                                    value={questionnaire}
                                    {...register("followingQuestionnaires")}
                                    className=" mr-1"
                                />
                                {questionnaire}
                            </label>
                        ))}
                    </div>
                </fieldset>
                <input
                    type="submit"
                    className="mt-2 cursor-pointer bg-blue-600 p-2 text-white"
                />
            </form>
            <Toaster />
        </>
    )
}
