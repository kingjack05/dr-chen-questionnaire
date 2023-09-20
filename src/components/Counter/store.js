import { atom } from "nanostores"
import { createFetcherStore } from "../../global/stores/fetcher"

export const $count = atom(0)

export const incrementCount = () => {
	$count.set($count.get() + 1)
}

export const $currentUser = createFetcherStore(["https://randomuser.me/api/"])
