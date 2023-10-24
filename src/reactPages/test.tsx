import { QueryContextProvider } from "../components/Providers/QueryContext"
import { trpc } from "../components/trpc"

const Test = () => {
    const patientsQuery = trpc.patient.patientLastEdited.useQuery()
    const patient = patientsQuery.data?.name
    return <>{patient}</>
}
export const TestPage = () => {
    return (
        <QueryContextProvider>
            <Test />
        </QueryContextProvider>
    )
}
