import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { registerMicroApps, start } from 'qiankun'
import { StateCreator } from 'zustand/vanilla'
import { AppStoreManager } from './AppStoreManager'
import { withLenses, lens } from '@dhmk/zustand-lens'
import { keyGetterMap as profileGetterMap, keyDomainMap as profileDomainMap } from './profiles'
import type { BankAccountInfo, FirmInfo, UserInfo, VirtualAccountInfo } from './profiles/types'
import { ProfileDomainMapValue, ProfileGetterMapValue } from './types'
import _ from 'lodash'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)

const globalStore = withLenses(() => ({
	profile: lens<{
		isMainAccount?: boolean
		userInfo?: UserInfo
		firmInfo?: FirmInfo
		bankAccountInfo?: BankAccountInfo
		virtualAccountInfo?: VirtualAccountInfo
	}>((set, get) => ({
		isMainAccount: false,
		update: (flag: boolean) => set({ isMainAccount: flag }, false, 'update profile'),
		getProfile: async (partial: string) => {
			const getters: Partial<{
				[key in ProfileDomainMapValue]: ProfileGetterMapValue
			}> = {}
			partial
				.split(',')
				.map(_.trim)
				.forEach(k => {
					const getter = profileGetterMap.get(k)
					const domainKey = profileDomainMap.get(k) as ProfileDomainMapValue
					if (!get()[domainKey] && getter && !getters[domainKey]) {
						getters[domainKey] = getter
					}
				})
			const promises = Object.keys(getters).map(domain => {
				const tDomain = domain as ProfileDomainMapValue
				const getter = getters[tDomain]
				if (!getter) {
					return Promise.resolve([tDomain, undefined])
				}
				return new Promise<[ProfileDomainMapValue, BankAccountInfo | FirmInfo | UserInfo | VirtualAccountInfo]>(
					(rsv, rej) => {
						getter().then(
							data => {
								rsv([tDomain, data])
							},
							err => {
								rej(err)
							},
						)
					},
				)
			})
			const results = (await Promise.allSettled(promises))
				.filter(a => a.status === 'fulfilled')
				.map((a: any) => a.value)
			results.forEach(result => {
				console.log('globalStore #80 查询结果:', result)
				const [domain, data] = result as unknown as [
					ProfileDomainMapValue,
					BankAccountInfo | FirmInfo | UserInfo | VirtualAccountInfo,
				]
				if (data) {
					set({ [domain]: data })
				}
			})

			const result: any = {}
			partial
				.split(',')
				.map(_.trim)
				.forEach(k => {
					const domainKey = profileDomainMap.get(k) as ProfileDomainMapValue
					const domainValue = get()[domainKey] as any
					if (domainValue && domainValue[k]) {
						result[k] = domainValue[k]
					}
				})
			return result
		},
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

const simplePlatformJudgement = (prefix: string, pathname?: string) => {
	// if (typeof pathname === "undefined" && !inBrowser()) {
	//   return false;
	// }
	const realPathName = pathname || window.location.pathname
	console.log('simplePlatformJudgement #42: ' + realPathName + ' prefix: ' + prefix)
	return realPathName?.startsWith(`/${prefix}`) || realPathName?.startsWith(`/full/${prefix}`)
}

export const setActiveRule = (prefix: string) => (pathname?: string) => simplePlatformJudgement(prefix, pathname)

registerMicroApps(
	[
		{
			name: 'app1', // app name registered
			// NOTICE: 后缀必须以 / 结尾，import-html-entry 的 defaultGetPublicPath 有点蠢
			entry: '//localhost:3001/app1/',
			container: '#sub',
			activeRule: () => setActiveRule('app')(), //() => true,
		},
		{
			name: 'app2',
			entry: '//localhost:3002/app2/',
			container: '#sub2',
			activeRule: () => setActiveRule('app')(), //() => true,
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
