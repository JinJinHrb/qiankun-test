import './public-path'
import './index.css'
import { StateCreator, StoreApi } from 'zustand'

export function bootstrap() {
	console.log('app2 bootstrap')
	return Promise.resolve()
}

export function mount(props?: {
	container: HTMLElement
	appStore: StoreApi<any>
	initSubAppStore: <T>(storeCreator: StateCreator<T>) => void
}) {
	;(
		(props?.container || document).querySelector('#root') as HTMLElement
	).innerHTML = `<div>app2</div><button id='button'>show app1 drawer</button>`

	;(props?.container || document).querySelector('#button')?.addEventListener('click', () => {
		// step4: 不依赖react，原生调用其他子应用
		props?.appStore.getState().app1.openAi()
		console.log('showDrawer')
	})

	props?.appStore.subscribe(state => {
		console.log('appStore change', state)
	})
}

export function unmount() {
	// root.unmount();
}
