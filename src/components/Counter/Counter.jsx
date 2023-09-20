// import { useState } from "react"
import { useStore } from "@nanostores/react"
import { $count, $currentUser, incrementCount } from "./store"

export const Counter = () => {
    // const [count, setcount] = useState(0)
    const count = useStore($count)
    const currentUser = useStore($currentUser)

    return (
        <>
            <span>{count}</span>
            <button onClick={incrementCount} className="btn border-2">
                Add Count
            </button>
            <div>{JSON.stringify(currentUser)}</div>
        </>
    )
}
