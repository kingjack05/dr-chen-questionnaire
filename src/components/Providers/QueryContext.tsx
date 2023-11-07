import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { useState } from "react"
import { trpc } from "../trpc"
import superjson from "superjson"

type queryError = {
    message: string
}
export const QueryContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        onError: (error) => {
                            const { message } = error as queryError
                            if (message === "UNAUTHORIZED") {
                                window.location.href = "/adminLogin"
                            }
                        },
                    },
                    mutations: {
                        onError(error, variables, context) {
                            const { message } = error as queryError
                            if (message === "UNAUTHORIZED") {
                                window.location.href = "/adminLogin"
                            }
                        },
                    },
                },
            }),
    )
    const [trpcClient] = useState(() =>
        trpc.createClient({
            transformer: superjson,
            links: [
                httpBatchLink({
                    url: "/api/trpc",
                    async headers() {
                        const token = localStorage.getItem("token")
                        if (token) {
                            return {
                                authorization: token,
                            }
                        }
                        return {}
                    },
                }),
            ],
        }),
    )
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}
