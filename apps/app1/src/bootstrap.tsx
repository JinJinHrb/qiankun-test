import './public-path'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StateCreator, StoreApi } from 'zustand/vanilla'
import { destroyAppStore, initAppStore } from './appStore'

export function bootstrap() {
	console.log('app1 bootstrap')
	return Promise.resolve()
}

let root: ReactDOM.Root

const store = (set, get, store) => ({
	aiVisible: false,
	openAi: () => set({ aiVisible: true }, false, 'openAi'),
	closeAi: () => set({ aiVisible: false }, false, 'closeAi'),
})

export function mount(props?: {
	container: HTMLElement
	appStore: StoreApi<any>
	initSubAppStore: (appName: string, store: StateCreator<any, any, any>) => void
}) {
	root = ReactDOM.createRoot((props?.container || document).querySelector('#root') as HTMLElement)
	// 初始化子应用的共享状态，
	props?.initSubAppStore('app1', store)

	// 类似 <GlobalStoreContextProvider>
	initAppStore(props?.appStore)

	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	)
}

export function unmount() {
	destroyAppStore()
	root.unmount()
}

if (!window.__POWERED_BY_QIANKUN__) {
	mount()
}
