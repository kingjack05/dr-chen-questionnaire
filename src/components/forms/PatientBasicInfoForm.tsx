import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import toast, { Toaster } from "react-hot-toast"

import { insertPatientSchema } from "../../server/patients/schema"

type TForm = Omit<z.infer<typeof insertPatientSchema>, "files">

type PropTypes = {
    disabled: boolean
    onSubmit: SubmitHandler<TForm>
    defaultValues: TForm
}

export const PatientBasicInfoForm = ({
    disabled = false,
    onSubmit,
    defaultValues,
}: PropTypes) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        // @ts-ignore
    } = useForm<TForm>({
        defaultValues,
        // zodResolver zod version issues: https://github.com/colinhacks/zod/issues/2663, https://github.com/orgs/react-hook-form/discussions/10861
        // can't figure it out so just ignoring it for now https://github.com/react-hook-form/resolvers/issues/451
        // @ts-ignore
        resolver: zodResolver(insertPatientSchema),
    })

    return (
        <>
            <form
                onSubmit={handleSubmit(
                    (data) => {
                        try {
                            onSubmit(data)
                            toast.success("編輯成功")
                        } catch (error) {
                            toast.error("編輯失敗")
                        }
                    },
                    (e) => {
                        console.log(e)
                        toast.error("編輯失敗")
                    },
                )}
            >
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
                        <input
                            {...register("name")}
                            className="input ml-6 bg-white"
                        />
                    </label>
                    <label className="block">
                        病歷號:
                        <input
                            {...register("id")}
                            className="input ml-2 bg-white"
                        />
                    </label>
                    <div>
                        主診斷:
                        {disabled ? (
                            <div className="ml-2 inline-block">
                                {defaultValues.diagnoses?.join(", ")}
                            </div>
                        ) : (
                            <>
                                <label className="block">
                                    <input
                                        type="checkbox"
                                        value="Raynaud"
                                        {...register("diagnoses")}
                                        className=" mr-1"
                                    />
                                    Raynaud
                                </label>
                                <label className="block">
                                    <input
                                        type="checkbox"
                                        value="RA"
                                        {...register("diagnoses")}
                                        className=" mr-1"
                                    />
                                    RA
                                </label>
                                <label className="block">
                                    <input
                                        type="checkbox"
                                        value="AIN Compression"
                                        {...register("diagnoses")}
                                        className=" mr-1"
                                    />
                                    AIN Compression
                                </label>
                            </>
                        )}
                    </div>
                </fieldset>
                {!disabled && (
                    <input
                        type="submit"
                        className="mt-2 cursor-pointer bg-blue-600 p-2 text-white"
                    />
                )}
            </form>
            <Toaster />
        </>
    )
}
