import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

import { QueryContextProvider } from "../components/Providers/QueryContext"
import { trpc } from "../components/trpc"

const AdminLoginPageWithoutProvider = () => {
    const [username, setUsername] = useState("")
    const [pwd, setPwd] = useState("")

    const login = trpc.admin.login.useMutation()

    return (
        <div className="flex h-screen items-center justify-center">
            <div>
                <div className=" w-80 rounded border border-gray-300">
                    <div className=" mb-16 ml-8 mt-10 text-xl">後臺登入:</div>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault()
                            const result = await login.mutateAsync({
                                username,
                                pwd,
                            })
                            if (!result.token) {
                                toast.error("登入失敗")
                                return
                            }
                            toast.success("登入成功")
                            localStorage.setItem("token", result.token)
                            window.location.href = "/"
                        }}
                    >
                        <div className=" ml-8">
                            <input
                                autoFocus
                                type="text"
                                className=" input mb-5 w-48 text-2xl"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                                placeholder="帳號"
                                autoComplete="on"
                            />
                            <input
                                type="password"
                                className=" input mb-5 w-48 text-2xl"
                                value={pwd}
                                onChange={(e) => {
                                    setPwd(e.target.value)
                                }}
                                placeholder="密碼"
                                autoComplete="on"
                            />
                        </div>
                        <div className="mb-8 mr-6 mt-16 flex flex-row-reverse">
                            <input type="submit" className="btn" value="登入" />
                        </div>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export const AdminLoginPage = () => {
    return (
        <QueryContextProvider>
            <AdminLoginPageWithoutProvider />
        </QueryContextProvider>
    )
}
