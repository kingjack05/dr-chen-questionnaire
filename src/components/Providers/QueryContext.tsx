import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { useState } from "react"
import { trpc } from "../trpc"
import superjson from "superjson"

export const QueryContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        trpc.createClient({
            transformer: superjson,
            links: [
                httpBatchLink({
                    url: "/api/trpc",
                    async headers() {
                        return {
                            authorization: "Hi",
                        }
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
