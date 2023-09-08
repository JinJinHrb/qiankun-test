import { StateCreator, StoreApi, createStore } from 'zustand/vanilla'
import { combineStore } from './combineStore'
import { NamedSet, devtools } from 'zustand/middleware'

export type AppStateCreate<T> = StateCreator<T, [['zustand/devtools', never]], []>

/**
 * store结构
 *
 * 优点：能隔离不同子应用的状态，很清晰知道是哪个子应用的状态
 *
 * ```
 * interface State {
 *  root: {
 *    profile: {}
 *  };
 *  fund: {};
 *  crm: {};
 *  crm-menu: {};
 * }
 * ```
 */
export class AppStoreManager<T extends Record<string, any>> {
	public store: Omit<StoreApi<T>, 'setState'> & {
		setState: NamedSet<T>
	}

	constructor() {
		this.store = createStore(devtools((set, get) => ({} as T), { name: 'appState' }))
	}

	initSubAppStore<R>(appName: string, storeCreator: AppStateCreate<R>) {
		this.store.setState(
			prevState => ({
				...prevState,
				...combineStore(storeCreator, this.store, appName as any),
			}),
			false,
			'initSubAppStore',
		)
	}

	resetSubAppStore(appName: string) {
		this.store.setState(({ [appName]: [_omittedAppName], ...restPrevState }) => restPrevState as T)
	}
}
