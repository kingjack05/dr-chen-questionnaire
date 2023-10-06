import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"

type BasicInfoInputs = {
    gender: "male" | "female"
    name: string
    id: string
    mainDiagnosis: string
}

type PropTypes = {
    disabled: boolean
    withSubmit?: boolean
    onSubmit?: SubmitHandler<BasicInfoInputs>
    defaultValues: BasicInfoInputs
}

export const PatientBasicInfoForm = ({
    disabled = false,
    withSubmit = false,
    onSubmit = () => {},
    defaultValues,
}: PropTypes) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<BasicInfoInputs>({
        defaultValues,
    })

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                {withSubmit ? (
                    <input
                        type="submit"
                        className="mt-2 cursor-pointer bg-blue-600 p-2 text-white"
                    />
                ) : null}
            </form>
        </>
    )
}
