import { nanoquery } from "@nanostores/query"

export const [createFetcherStore, createMutatorStore] = nanoquery({
    fetcher: (...keys) => fetch(keys.join("")).then((r) => r.json()),
})

export const trpcStoreBuilder = (procedure: string) => {
    const [createTRPCFetcherStore, createTRPCFMutatorStore] = nanoquery({
        fetcher: (...keys) => {
            return Promise.resolve("1279462")
        },
    })
    return { createTRPCFetcherStore, createTRPCFMutatorStore }
}
