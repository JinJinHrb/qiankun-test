import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { registerMicroApps, start } from 'qiankun'
import { StateCreator } from 'zustand/vanilla'
import { AppStoreManager } from './AppStoreManager'
import { withLenses, lens } from '@dhmk/zustand-lens'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)

const globalStore = withLenses(() => ({
	profile: lens(set => ({
		isMainAccount: false,
		//@ts-ignore
		update: () => set({ isMainAccount: true }, false, 'update profile'),
	})),
}))

// step1 定义全局状态
const appStoreManager = new AppStoreManager()
appStoreManager.initSubAppStore(
	// root是基座使用的状态
	'root',
	//@ts-ignore
	globalStore,
)

registerMicroApps(
	[
		{
			name: 'app1', // app name registered
			// NOTICE: 后缀必须以 / 结尾，import-html-entry 的 defaultGetPublicPath 有点蠢
			entry: '//localhost:3001/app1/',
			container: '#sub',
			activeRule: () => true,
		},
		{
			name: 'app2',
			entry: '//localhost:3002',
			container: '#sub1',
			activeRule: () => true,
		},
	].map(items => ({
		...items,
		props: {
			// step2: 提供子应用全局状态
			appStore: appStoreManager.store,
			initSubAppStore: <T,>(appName: string, storeCreator: StateCreator<T>) => {
				appStoreManager.initSubAppStore(appName, storeCreator)
			},
			resetSubAppStore: (appName: string) => {
				appStoreManager.resetSubAppStore(appName)
			},
		},
	})),
)

start({
	prefetch: false,
	singular: false,
	sandbox: { experimentalStyleIsolation: true },
})
