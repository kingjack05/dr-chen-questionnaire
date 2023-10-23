import { QueryContextProvider } from "../components/Providers/QueryContext"
import { trpc } from "../components/trpc"

const Test = () => {
    const patientsQuery = trpc.patient.patients.useQuery()
    const patient = patientsQuery.data && patientsQuery.data[0].name
    return <>{patient}</>
}
export const TestPage = () => {
    return (
        <QueryContextProvider>
            <Test />
        </QueryContextProvider>
    )
}
