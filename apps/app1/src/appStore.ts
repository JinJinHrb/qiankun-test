import { StoreApi, createStore } from 'zustand'

export let appStore: StoreApi<any> | undefined = createStore(() => ({}))

export const initAppStore = (store?: StoreApi<any>) => {
	if (!store) return
	appStore = store
}

export const destroyAppStore = () => {
	appStore = undefined
}
