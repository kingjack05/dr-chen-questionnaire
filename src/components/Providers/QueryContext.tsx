import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TRPCClientError, httpBatchLink } from "@trpc/client"
import { useState } from "react"
import { trpc } from "../trpc"
import superjson from "superjson"
import type { AppRouter } from "../../server/routerIndex"

const HTTP_STATUS_TO_NOT_RETRY = ["UNAUTHORIZED"]
function isTRPCClientError(
    cause: unknown,
): cause is TRPCClientError<AppRouter> {
    return cause instanceof TRPCClientError
}

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
                        // https://github.com/TanStack/query/discussions/372#discussioncomment-6023276
                        retry: (failureCount, error) => {
                            if (
                                isTRPCClientError(error) &&
                                HTTP_STATUS_TO_NOT_RETRY.includes(error.message)
                            ) {
                                return false
                            }
                            return true
                        },
                    },
                    mutations: {
                        onError: (error) => {
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
