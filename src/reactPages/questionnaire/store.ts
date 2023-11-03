import { atom, action } from "nanostores"

export const $currentCompletedQs = atom(0)

export const $setCurrentCompletedQs = action(
    $currentCompletedQs,
    "setCurrentCompletedQs",
    (store, data) => {
        store.set(data)
    },
)
