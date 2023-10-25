import { QueryContextProvider } from "../components/Providers/QueryContext"
import { trpc } from "../components/trpc"

const Test = () => {
    const filesQuery = trpc.patient.getFiles.useQuery()
    const files = filesQuery.data
    return <>{JSON.stringify(files)}</>
}
export const TestPage = () => {
    return (
        <QueryContextProvider>
            <Test />
        </QueryContextProvider>
    )
}
