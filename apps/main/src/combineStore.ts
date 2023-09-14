import type { StateCreator, StoreApi, StoreMutatorIdentifier } from 'zustand/vanilla'

type KeepProps<T, TFilter> = Pick<T, { [K in keyof T]: T[K] extends TFilter ? K : never }[keyof T]>

export function combineStore<
	TNestedState,
	TOriginal,
	TKey extends keyof KeepProps<TOriginal, TNestedState>,
	Mis extends [StoreMutatorIdentifier, unknown][] = [],
	Mos extends [StoreMutatorIdentifier, unknown][] = [],
>(creator: StateCreator<TNestedState, Mis, Mos>, originalApi: StoreApi<TOriginal>, key: TKey): Pick<TOriginal, TKey> {
	type InnerStore = TOriginal[TKey]

	const api: Omit<StoreApi<InnerStore>, 'destroy'> = {
		setState: nestedSetState(originalApi, key),
		getState: nestedGetState(originalApi, key),
		subscribe: (listener: (state: InnerStore, prevState: InnerStore) => void) => () => {
			return originalApi.subscribe((state, prevState) => {
				if (state[key] !== prevState[key]) {
					listener(state[key], prevState[key])
				}
			})
		},
		// destroy: originalApi.destroy,
		// Use `unsubscribe` returned by `subscribe`
		// deprecated @ 2023-09-08 15:52:18
	}

	// we need to cast it, because somehow typescript don't recognize that the TNestedState is the same as TOriginal[TKey]
	const nestedApi = api as StoreApi<TNestedState>

	return {
		[key]: (creator as StateCreator<TNestedState>)(nestedApi.setState, nestedApi.getState, nestedApi),
	} as Pick<TOriginal, TKey>
}

function nestedGetState<TStore, TKey extends keyof TStore>(
	store: StoreApi<TStore>,
	key: TKey,
): StoreApi<TStore[TKey]>['getState'] {
	return () => store.getState()[key]
}

function nestedSetState<TStore, TKey extends keyof TStore>(
	store: StoreApi<TStore>,
	key: TKey,
): StoreApi<TStore[TKey]>['setState'] {
	return (partial, replace, ...args) => {
		const prevNestedState = nestedGetState(store, key)()
		const newPartial = partial instanceof Function ? partial(prevNestedState) : partial
		const newNestedState: TStore[TKey] = replace ? (newPartial as TStore[TKey]) : { ...prevNestedState, ...newPartial }
		const prevState = store.getState()
		const newState: TStore = { ...prevState, [key]: newNestedState }

		store.setState(newState, false, ...args)
	}
}
